import React, { useState, useRef, useEffect, useCallback } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import mapboxgl from 'mapbox-gl'
// import '../../../docs/node_modules/mapbox-gl/dist/mapbox-gl.css'
import { StyledMap, StyledMapContainer } from './styles'
import mockJson from './mocks/sweetgreen.json'
// import mockJson from './__mocks__/coh.json'
import './map.css'
// import Sidebar from './Sidebar/Sidebar'
// import PopupContent from './PopupContent'
// import ZoomControls from './ZoomControls'
import { useMobile } from '../../hooks'

const Map = ({ initZoom = 14 }) => {
  const [map, setMap] = useState(null)
  const mapContainer = useRef(null)
  const [isMobile] = useMobile()

  // Temp data manipulation
  let features = mockJson.features
  features = features.map((feature, i) => ({ id: i, ...feature }))
  let mockData = mockJson
  mockData.features = features

  // Util Functions

  /*
   * Hide all layers
   * Render layer based on category
   * Map category name to layer name
   */
  // const renderLayer = () => {}

  // const createPopup = useCallback(
  //   (properties, coordinates) => {
  //     const popUps = document.getElementsByClassName('mapboxgl-popup')
  //     if (popUps[0]) popUps[0].remove()

  //     const placeholder = document.createElement('div')
  //     ReactDOM.render(<PopupContent {...properties} />, placeholder)

  //     new mapboxgl.Popup({ closeOnClick: false })
  //       .setLngLat(coordinates)
  //       .setDOMContent(placeholder)
  //       .addTo(map)
  //   },
  //   [map]
  // )

  const fitToBounds = useCallback(
    features => {
      if (map && features) {
        const popUps = document.getElementsByClassName('mapboxgl-popup')
        if (popUps[0]) popUps[0].remove()
        let bounds = new mapboxgl.LngLatBounds()

        features.forEach(feature => {
          bounds.extend(feature.geometry.coordinates)
        })

        map.fitBounds(bounds, {
          padding: 300,
          offset: !isMobile ? [100, 0] : [0, 0],
        })
      }
    },
    [isMobile, map]
  )

  // TODO: rename for clarity and minimize bloat in namespace
  const handleClick = useCallback(
    ({ geometry: { coordinates }, properties }) => {
      if (map) {
        map.flyTo({
          center: coordinates,
          zoom: 15,
          offset: !isMobile ? [200, 0] : [0, 0],
        })
        // const bounds = new mapboxgl.LngLatBounds([12, 12, 12, 12])
        // map.fitBounds(bounds)
        // createPopup(properties, coordinates)
      }
    },
    [
      // createPopup, 
      isMobile, map]
  )

  // TODO: male marker background dynamic
  const addMarkers = useCallback(
    stores => {
      if (map) {
        stores.features.forEach(marker => {
          const el = document.createElement('div')
          el.className = 'marker'
          el.style.backgroundImage =
            'url("https://images.ctfassets.net/xqzvef1zylwc/5aPFYnvF6pW9A1jTpXL3Ju/4d97cfedd2fa00a3c5d81a0ca81cd767/Parking_Map_Marker_3x.png")'
          el.addEventListener('click', () => {
            handleClick(marker)
          })
          new mapboxgl.Marker(el, { offset: [0, -23] })
            .setLngLat(marker.geometry.coordinates)
            .addTo(map)
        })
      }
    },
    [handleClick, map]
  )

  useEffect(() => {
    mapboxgl.accessToken = process.env.GATSBY_MAPBOX_API_TOKEN_PUBLIC
    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v10', // stylesheet location
        // center: [-117.97091, 34.12958], // coh
        center: [-77.034084, 38.909671], // sweetgreen
        zoom: 5,
      })

      map.on('load', () => {
        setMap(map)
        map.resize()
        // map.zoomTo(initZoom, { duration: 3000 })
        map.addControl(new mapboxgl.NavigationControl())
        map.addControl(new mapboxgl.FullscreenControl())

        map.addSource('locations', {
          type: 'geojson',
          data: mockData,
        })
      })
    }

    if (!map) initializeMap({ setMap, mapContainer })

    if (map) {
      addMarkers(mockData)
      fitToBounds(features)
      map.on('click', 'locations', ({ features }) => {
        if (features.length) {
          handleClick(features[0])
        }
      })

      map.on('mouseenter', 'locations', () => {
        map.getCanvas().style.cursor = 'pointer'
      })

      map.on('mouseleave', 'locations', () => {
        map.getCanvas().style.cursor = ''
      })
    }
  }, [
    addMarkers,
    // createPopup,
    features,
    features.length,
    fitToBounds,
    handleClick,
    initZoom,
    map,
    mockData,
  ])

  return (
    <StyledMapContainer position="relative" height="100vh">
      {/* <Sidebar
        map={map}
        locations={mockData.features}
        handleClick={handleClick}
        fitToBounds={fitToBounds}
      /> */}

      <StyledMap
        ref={el => (mapContainer.current = el)}
        width="100%"
        height="100%"
        position="absolute"
        top="0"
        left="0"
      />
      {/* <ZoomControls map={map} /> */}
    </StyledMapContainer>
  )
}

Map.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  center: PropTypes.arrayOf(PropTypes.number),
  zoom: PropTypes.number,
  bounds: PropTypes.arrayOf(PropTypes.number),
  minZoom: PropTypes.number,
  maxZoom: PropTypes.number,
  styles: PropTypes.arrayOf(PropTypes.string),
  padding: PropTypes.number,
  sources: PropTypes.object,
  layers: PropTypes.arrayOf(PropTypes.object),
}

Map.defaultProps = {
  width: 'auto',
  height: '100%',
  center: [0, 0],
  zoom: 0,
  bounds: null,
  minZoom: 0,
  maxZoom: 24,
  styles: ['light-v9', 'dark-v9', 'streets-v11'],
  padding: 0.1, // padding around bounds as a proportion
  sources: {},
  layers: [],
}

const GeoMap = ({ sources, layers }) => {
  return (
    <div>
      {/* Map */}
      <Map sources={sources} layers={layers} />
    </div>
  )
}

GeoMap.propTypes = {}

export default GeoMap
