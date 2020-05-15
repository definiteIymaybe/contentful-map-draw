import styled from 'styled-components'
import {
  position,
  space,
  layout,
  color,
  border,
  typography,
  flexbox,
} from 'styled-system'

export const StyledContainer = styled.div`
  margin: 0;
  padding: 0;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  ${space}
  ${color}
  ${typography}
  ${layout}
  ${position}
  ${border}
  ${flexbox}
`

export const StyledText = styled.p`
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  ${space}
  ${color}
  ${typography}
  ${layout}
  ${position}
  ${border}
`

export const StyledMapContainer = styled(StyledContainer)`
  overflow: hidden;
`

export const StyledMap = styled(StyledMapContainer)`
  border-left: 1px solid #fff;
  top: 0;
  bottom: 0;
  ${position}
  ${border}
`

export const StyledSidebar = styled(StyledMapContainer)`
  border-radius: 10px;
  box-shadow: 2px 2px 4px #d9d9d6;
  ${border};
`

export const StyledPreviewContainer = styled(StyledContainer)`
  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    border: none;
  }
`

export const StyledPreviewContent = styled(StyledContainer)`
  cursor: pointer;
`

export const StyledAddress = styled(StyledText)`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`

export const StyledPhoneNumber = styled.a`
  cursor: pointer;
  display: block;
  ${space}
  ${color}
  ${typography}
  
  &:hover {
    text-decoration: underline;
  }
`

export const StyledPopup = styled(StyledContainer)``

export const StyledPopupTitle = styled(StyledText)``

export const StyledPopupAddress = styled(StyledText)``

export const StyledZoomContainer = styled(StyledContainer)`
  display: flex;
  flex-direction: column;
  ${layout}
  ${flexbox}
`

export const StyledBtn = styled.button`
  margin: 0;
  padding: 0;
  border: none;
  cursor: pointer;
  outline: none;
 
  ${space}
  ${color}
  ${typography}
  ${layout}
  ${position}
  ${border}
`

export const StyledSvgContainer = styled(StyledContainer)`
  display: flex;
  justify-content: center;
  align-items: center;
  ${layout}
  ${flexbox}
`

export const StyledSvg = styled.img`
  ${space}
  ${color}
  ${typography}
  ${layout}
  ${position}
  ${border}
`

export const StyledCategoryContainer = styled(StyledContainer)`
  height: 100%;
  ${layout}
`

export const StyledCategoryHeaderContainer = styled(StyledContainer)``

export const StyledList = styled.ul`
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  ::-webkit-scrollbar {
    width:3px;
    height:3px;
    border-left:0;
    background:rgba(0,0,0,0.1);
  }
  ::-webkit-scrollbar-track {
    // background:none;
  }
  ::-webkit-scrollbar-thumb {
    // background:#00853e;
    border-radius:0;
  }
  ${space}
  ${color}
  ${typography}
  ${layout}
  ${position}
  ${border}
`

export const StyledListItem = styled.li`
  list-style-type: none;
  margin: 0;
  padding: 0;
  ${space}
  ${color}
  ${typography}
  ${layout}
  ${position}
  ${border}
`

export const StyledCategoryList = styled(StyledList)`
  overflow-y: scroll;
`
export const StyledHighlightList = styled(StyledList)``
export const StyledHighlightItem = styled(StyledListItem)``

export const StyledViewContainer = styled(StyledContainer)``
export const StyledSectionContainer = styled(StyledContainer)``
export const StyledCategoryListContainer = styled(StyledContainer)``
export const StyledDetailContainer = styled(StyledContainer)``

export const StyledSectionTitle = styled(StyledText)`
  text-transform: uppercase;
`
export const StyledCategoryTitle = styled(StyledText)`
  cursor: pointer;
`

export const StyledZoomBtn = styled(StyledBtn)``

export const StyledBackBtn = styled(StyledBtn)``
