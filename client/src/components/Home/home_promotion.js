import React from 'react';
import MyButton from "../../utils/button";

const HomePromotion = (props) => {

  const promotion = {
    img: '/images/featured/featured_home_3.jpg',
    lineOne: 'Up to 40% Off',
    lineTwo: 'In second hand guitars',
    linkTitle:'View offers',
    linkTo: '/shop'
  };

  const renderPromotion = () => (
      promotion &&
          <div className="home_promotion_img"
            style={{
              background: `url(${promotion.img}) no-repeat`
            }}
          >
            <div className="tag title">{promotion.lineOne}</div>
            <div className="tag low_title">{promotion.lineTwo}</div>
            <div>
              <MyButton
                  type="default"
                  title={promotion.linkTitle}
                  linkTo={promotion.linkTo}
                  addStyles={{
                    margin:'10px 0 0 0'
                  }}
              />
            </div>
          </div>
  );

  return (
      <div className="home_promotion">
        {renderPromotion()}
      </div>
  );
};

export default HomePromotion;