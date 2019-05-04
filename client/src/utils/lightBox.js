import React, {Component} from 'react';
import Lightbox from 'react-images';

class ImageLightBox extends Component {

  state = {
    lightboxIsOpen: true,
    currentImage: this.props.pos,
    images: []
  };

  static getDerivedStateFromProps(props, state) {
    if(props.images){
      let images = [];
      props.images.forEach(item => images.push({src: item}));
      return state = {
        images
      };
    }
    return false;
  }

  closeLightBox = () => {this.props.onclose()};

  goToPrev = () => {
    this.setState({
      currentImage: this.state.currentImage - 1
    });
  };

  goToNext = () => {
    this.setState({
      currentImage: this.state.currentImage + 1
  });
  };

  render() {

    const {currentImage, lightboxIsOpen, images} = this.state;

    return (
        <Lightbox
            onClose={this.closeLightBox}
            images={images}
            currentImage={currentImage}
            isOpen={lightboxIsOpen}
            onClickPrev={() => this.goToPrev()}
            onClickNext={() => this.goToNext()}
        />
    );
  }
}

export default ImageLightBox;