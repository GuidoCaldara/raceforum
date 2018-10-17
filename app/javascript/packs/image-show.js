import React from 'react';
import ReactDOM from 'react-dom';

class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.changeMainImg = this.changeMainImg.bind(this)
    this.goFullScreen = this.goFullScreen.bind(this)
    this.changeFullBackground = this.changeFullBackground.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.moveRight = this.moveRight.bind(this)
    this.moveLeft = this.moveLeft.bind(this)
    this.state = {
      background: props.images[0],
      display: true,
      fullScreen: false,
      index: 0
    }
  }

  moveRight(){
    let index = this.state.index
    if (index < this.props.images.length -1 ) index = index + 1
    this.setState((prevState) => {
      return {
        index: index,
        background: this.props.images[index]
      }
    })
  }

  moveLeft(){
    let index = this.state.index
    if (index >= 0 && index-1 >= 0) index = index - 1
    this.setState((prevState) => {
      return {
        index: index,
        background: this.props.images[index]
      }
    })
  }


  changeMainImg(e) {
    const background = e.target.dataset.value
    const index = this.props.images.indexOf(background)
    this.setState(() => {
      return {
        background: background,
        index: index
      }
    })
  }

  changeFullBackground(e) {
    let elem = document.querySelector("#modalFullPhoto")
    M.Modal.init(elem, { dismissible: false})
    var instance = M.Modal.getInstance(elem);
    instance.open();
    this.setState(() => {
      return {fullScreen: true}
    })
  }

  closeModal(e) {
    let elem = document.querySelector("#modalFullPhoto")
    var instance = M.Modal.getInstance(elem);
    instance.close();

    this.setState(() => {
      return {fullScreen: false}
    })
  }

  goFullScreen(e) {}

  render() {
    return (<div>
      <MainImage index={this.state.index} open={this.state.fullScreen} moveRight={this.moveRight} moveLeft={this.moveLeft} actionModal={this.changeFullBackground} images={this.props.images} background={this.state.background}/>
      <SmallImagesBox changeMainImg={this.changeMainImg} images={this.props.images} open={this.state.fullScreen}/>
      <PhotoFullContainer moveRight={this.moveRight} moveLeft={this.moveLeft} changeMainImg={this.changeMainImg} background={this.state.background} closeModal={this.closeModal} images={this.props.images} open={this.state.fullScreen}/>
    </div>)

  }
}

const PhotoFullContainer = (props) => {
  return (
    <div id="modalFullPhoto" className="modal modal-full-screen-photos">
      <div className="modal-content">
        <div className="photo-big-modal">
            <div className="modal-body modal-gallery-body">
              <MainImage moveRight={props.moveRight} moveLeft={props.moveLeft} background={props.background} actionModal={props.closeModal} open={props.open}/>
              <SmallImagesBox changeMainImg={props.changeMainImg} images={props.images} open={props.open}/>
          </div>
        </div>
      </div>
    </div>

)
}

class MainImage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let dataDismiss = ""
    let funct = this.props.actionModal
    let screen_size = "fullscreen"
    let className = "main-image-container"
    if (this.props.open) {
      dataDismiss = "modal"
      screen_size = "fullscreen_exit"
      className = "main-image-container full-screen-gallery"
    }
    let divStyle = {
      backgroundImage: 'url(' + this.props.background + ')'
    };
    return (<div className={className} style={divStyle}>
        <i onClick={this.props.moveLeft} id="scroll-left-full" className="go-full-screen-icon medium material-icons">keyboard_arrow_left</i>
        <i onClick={this.props.moveRight} id="scroll-right-full" className="go-full-screen-icon medium material-icons">keyboard_arrow_right</i>
      <div onClick={funct} data-value={this.props.background} data-toggle="modal" data-dismiss={dataDismiss}></div>
      <i onClick={funct} className="go-full-screen-icon medium material-icons">{screen_size}</i>
    </div>)
  }
}

const SmallImage = (props) => {

  let divStyle = {
    backgroundImage: 'url(' + props.source + ')'
  };
  return (<div onClick={props.funct} className="small-img-box" style={divStyle} data-value={props.source}></div>);
}

const ScrollRight = () => {
  const scrollingRight = () => {
    const el = document.querySelector(".thumb-box")
    el.scrollLeft = el.scrollLeft + 100
  }

  return (<div id="scroll-right-box">
    <i onClick={scrollingRight} id="scroll-right" className="fas fa-caret-right"></i>
  </div>)
}

const ScrollLeft = () => {
  const scrollingLeft = () => {
    const el = document.querySelector(".thumb-box")
    el.scrollLeft = el.scrollLeft - 100
  }
  return (<div id="scroll-left-box">
    <i onClick={scrollingLeft} id="scroll-left" className="fas fa-caret-left"></i>
  </div>)
}

const SmallImagesBox = (props) => {
  let images = props.images
  let list = images.map(e => <SmallImage funct={props.changeMainImg} key={e} source={e}/>)
  return (<div className="slider-box">
    <ScrollLeft/>
    <div className="thumb-box thumbnail-container">
      {list}
    </div>
    <ScrollRight/>
  </div>);

}

document.addEventListener('DOMContentLoaded', () => {
  var object = document.querySelector('#objects_imgs_data').dataset
  let images = JSON.parse(object.images)
  ReactDOM.render(<Slider images={images}/>, document.querySelector(".carousel-box"))
})
