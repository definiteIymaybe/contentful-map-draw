import React from 'react'
// import PropTypes from 'prop-types'
import 'mapbox-gl/dist/mapbox-gl.css'
import {
  StyledZoomContainer,
  StyledZoomBtn,
  StyledSvg,
  StyledSvgContainer,
} from './styles'
import plusIcon from '../../assets/plus-icon@3x.png'
import minusIcon from '../../assets/minus-icon@3x.png'

const ZoomBtn = ({ handleClick, type = 'plus' }) => {
  return (
    <StyledZoomBtn
      onClick={handleClick}
      fontSize={5}
      borderRadius={type === 'plus' ? '5px 5px 0px 0px' : ' 0px 0px 5px 5px'}
      color="light.text"
      border="1px solid currentColor"
      borderBottom={type === 'plus' && 'none'}
    >
      <StyledSvgContainer width="15px" height="30px" p={1}>
        <StyledSvg src={type === 'plus' ? plusIcon : minusIcon} width="100%" />
      </StyledSvgContainer>
    </StyledZoomBtn>
  )
}

const ZoomControls = ({ map }) => {
  return (
    <StyledZoomContainer
      position="absolute"
      zIndex={5}
      right="30px"
      top="30px"
      color="currentColor"
    >
      <ZoomBtn handleClick={() => map.zoomIn()} type="plus" />
      <ZoomBtn handleClick={() => map.zoomOut()} type="minus" />
    </StyledZoomContainer>
  )
}

export default ZoomControls
