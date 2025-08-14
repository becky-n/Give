import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import './PostData.css';

const settings = {
  dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 1000,
      variableWidth: true,
      dotsClass: "my-slick-dots",
      arrows:false,
};

const PostData = ({post}) => {

  const hasContent = post.content && post.content.length > 0;

  return (
    <div className='post-data-container'>
      <div className='post-question'>{post.question}</div>
      {hasContent && (
        <Slider {...settings} className="post-slider">
          {post.content.map((image, index) => (
            <div key={index} className="post-slide">
              <img src={image} alt={`Post image ${index + 1}`} className="post-image" />
            </div>
          ))}
        </Slider>
      )}
  </div>
  );
}

export default PostData;