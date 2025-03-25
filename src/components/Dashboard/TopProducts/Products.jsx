import React,{useState,useEffect} from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Products.css'; 
import axios from 'axios';

const TopSellingProducts = () => {

  const [products, setProducts] = useState([]);
  // const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
      axios.get('http://localhost:5000/owner/best-selling-products',{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })   
      .then(response => {
       
        setProducts(response.data.topProducts);
      })
      .catch(error => console.error('Error fetching products:', error));
        console.log(products.length);
  }, []);

  
    const getImageSrc = (img) => {
      return `http://localhost:5000/Images/${img}`;
    };


  const settings = {
    infinite: true,  
    speed: 3000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,   
    autoplaySpeed: 20,
    cssEase: 'linear',   
    arrows: true,  
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <div className="product-slider-container">
      <h3>Top Selling Products</h3>
      {products.length!==0?(
        <>
      <Slider {...settings}>
        { products.map((product,index) => (
          <div className="product-card" key={product._id}>
            <label style={{color:"#05151e",fontWeight:"bold"}}>{index+1}</label>
            <img 
             src={getImageSrc(product.img)}
            alt={product.productName} 
             onError={(e) => {
               e.target.onerror = null; 
             }}
             />
            <div className="product-info">
              <h4>{product.productName}</h4>
              <p>{product.totalQuantitySold}</p>
            </div>
          </div>
        ))}
      </Slider>
      </>
    ):(
      <h2>Nothing Sold Yet</h2>
    )}
    </div>
  );
};

export default TopSellingProducts;


// const TopSellingProducts = () => {
//     const scrollRef = useRef(null);
  
//     const scrollLeft = () => {
//       scrollRef.current.scrollBy({ left: -220, behavior: 'smooth' });
//     };
  
//     const scrollRight = () => {
//       scrollRef.current.scrollBy({ left: 220, behavior: 'smooth' });
//     };
  
//     return (
//       <div className="product-slider-container">
//         <h3>Top Selling Products</h3>
//         <div className="slider">
//           <button className="arrow left-arrow" onClick={scrollLeft}>
//             &lt;
//           </button>
          
//           <div className="product-slider" ref={scrollRef}>
//             {dummyProducts.map((product) => (
//               <div className="product-card" key={product.id}>
//                 <img src={product.imageUrl} alt={product.name} />
//                 <div className="product-info">
//                   <h4>{product.name}</h4>
//                   <p>{product.stock}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
        
//           <button className="arrow right-arrow" onClick={scrollRight}>
//             &gt;
//           </button>
//         </div>
//       </div>
//     );
//   };
  
//   export default TopSellingProducts;