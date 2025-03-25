// import { Row, Button } from "react-bootstrap";
// import { useEffect, useState } from "react";
// import ProductCard from "./ProductCard/ProductCard";

// const ShopList = ({ productItems }) => {
//   const itemsPerPage = 12;
//   const [currentPage, setCurrentPage] = useState(1);

//   useEffect(() => {
//     setCurrentPage(1); // Reset to first page if productItems change
//   }, [productItems]);

//   const totalPages = Math.ceil(productItems.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const currentProducts = productItems.slice(startIndex, startIndex + itemsPerPage);

//   if (productItems.length === 0) {
//     return <h1 className="not-found">Product Not Found !!</h1>;
//   }

//   return (
//     <>
//       <Row className="justify-content-center">
//         {currentProducts.map((productItem) => (
//           <ProductCard
//             key={productItem._id}
//             title={null}
//             productItem={productItem}
//           />
//         ))}
//       </Row>
      
//       <div className="pagination-controls text-center mt-4">
//         <Button
//           variant="primary"
//           onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//           disabled={currentPage === 1}
//         >
//           Previous
//         </Button>
//         <span className="mx-3">
//           Page {currentPage} of {totalPages}
//         </span>
//         <Button
//           variant="primary"
//           onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//           disabled={currentPage === totalPages}
//         >
//           Next
//         </Button>
//       </div>
//     </>
//   );
// };

// export default ShopList;

import { Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard/ProductCard";
import ReactPaginate from "react-paginate";
import "./ShopList.css"; // For custom styling

const ShopList = ({ productItems }) => {
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    setCurrentPage(0); // Reset to first page if productItems change
  }, [productItems]);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const startIndex = currentPage * itemsPerPage;
  const currentProducts = productItems.slice(startIndex, startIndex + itemsPerPage);

  if (productItems.length === 0) {
    return <h1 className="not-found">Product Not Found !!</h1>;
  }

  return (
    <>
      <Row className="justify-content-center">
        {currentProducts.map((productItem) => (
          <ProductCard
            key={productItem._id}
            title={null}
            productItem={productItem}
          />
        ))}
      </Row>

      <div className="pagination-container">
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          breakLabel={"..."}
          pageCount={Math.ceil(productItems.length / itemsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
        />
      </div>
    </>
  );
};

export default ShopList;
