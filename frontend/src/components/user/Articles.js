import React, { useState, useEffect } from "react";
import {
  MDBRipple,
  MDBCard,
  MDBBtn,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import axios from "axios";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState("");
  const [modalIndex, setModalIndex] = useState(null);
  const [isOpen, setIsOpen] = useState(articles.map(() => false));

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/article/articles`
        );
        setArticles(response.data.data);
      } catch (error) {
        setError("Error retrieving articles");
      }
    };

    fetchArticles();
  }, []);

  const toggleModal = (index) => {
    const newIsOpen = [...isOpen];
    newIsOpen[index] = !newIsOpen[index];
    setIsOpen(newIsOpen);
  };

  return (
    <div className="row my-5">
      {articles.map((article, index) => (
        <div key={index} className="col-md-4 mb-2">
          <MDBCard style={{ height: "400px", width: "100%" }}>
            <MDBCardImage
              src={article.image[0].url}
              fluid
              alt={article.title}
              style={{ height: "220px", width: "100%" }}
            />
            <MDBCardBody>
              <MDBCardTitle>{article.title}</MDBCardTitle>
              <MDBCardText>{article.author}</MDBCardText>
              <MDBCardText>{article.description}</MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </div>
      ))}
    </div>
    //For reference
    //          <div className="row my-5">
    //     <div className="col-md-4 ">
    //       {" "}
    //       <MDBCard>
    //         <MDBRipple
    //           rippleColor="light"
    //           rippleTag="div"
    //           className="bg-image hover-overlay"
    //         >
    //           <MDBCardImage
    //             src="../assets/images/1.jpg"
    //             fluid
    //             alt="..."
    //             style={{ height: "220px", width: "100%" }}
    //           />
    //           <a>
    //             <div
    //               className="mask"
    //               style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
    //             ></div>
    //           </a>
    //         </MDBRipple>
    //         <MDBCardBody>
    //           <MDBCardTitle>Food Waste </MDBCardTitle>
    //           <MDBCardText>
    //             How much food does family throw away in a week?
    //           </MDBCardText>
    //           {/* this is modal  */}

    //           <MDBBtn onClick={toggleOpen}>Description</MDBBtn>

    //           <MDBModal
    //             tabIndex="-1"
    //             open={centredModal}
    //             setOpen={setCentredModal}
    //           >
    //             <MDBModalDialog centered size="">
    //               <MDBModalContent>
    //                 <MDBModalHeader>
    //                   <MDBModalTitle>Did you know?</MDBModalTitle>
    //                   <MDBBtn
    //                     className="btn-close"
    //                     color="none"
    //                     onClick={toggleOpen}
    //                   ></MDBBtn>
    //                 </MDBModalHeader>
    //                 <MDBModalBody>
    //                   <p>
    //                     <div class="clearfix">
    //                       <img
    //                         src="../assets/images/1.jpg"
    //                         class="col-md-6 float-md-end mb-3 ms-md-3"
    //                         alt="..."
    //                         style={{ maxWidth: "100%", height: "auto" }}
    //                       />
    //                       On average, American households are throwing away
    //                       6.2 cups of food per week, with leftover
    //                       waste/spoilage and overreliance on date labels
    //                       identified as two of the primary contributors to
    //                       this waste. According to the U.S. Food & Drug
    //                       Administration, 30% to 40% of food in the United
    //                       States is wasted.
    //                     </div>
    //                   </p>
    //                 </MDBModalBody>
    //                 <MDBModalFooter>
    //                   <MDBBtn color="secondary" onClick={toggleOpen}>
    //                     Close
    //                   </MDBBtn>
    //                 </MDBModalFooter>
    //               </MDBModalContent>
    //             </MDBModalDialog>
    //           </MDBModal>
    //         </MDBCardBody>
    //       </MDBCard>
    //     </div>
    //     <div className="col-md-4">
    //       {" "}
    //       <MDBCard>
    //         <MDBRipple
    //           rippleColor="light"
    //           rippleTag="div"
    //           className="bg-image hover-overlay"
    //         >
    //           <MDBCardImage
    //             src="../assets/images/piggy.jpg"
    //             fluid
    //             alt="..."
    //             style={{ maxWidth: "100%", height: "auto" }}
    //           />
    //           <a>
    //             <div
    //               className="mask"
    //               style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
    //             ></div>
    //           </a>
    //         </MDBRipple>
    //         <MDBCardBody>
    //           <MDBCardTitle>Pig Feeds</MDBCardTitle>
    //           <MDBCardText>Can pigs eat vegetable scraps?</MDBCardText>
    //           <MDBBtn onClick={toggleOpen1}>Description</MDBBtn>
    //           {/* THIS IS MODAL 1 */}
    //           <MDBModal
    //             tabIndex="-1"
    //             open={centredModal1}
    //             setOpen={setCentredModal1}
    //           >
    //             <MDBModalDialog centered>
    //               <MDBModalContent>
    //                 <MDBModalHeader>
    //                   <MDBModalTitle>Did you know?</MDBModalTitle>
    //                   <MDBBtn
    //                     className="btn-close"
    //                     color="none"
    //                     onClick={toggleOpen1}
    //                   ></MDBBtn>
    //                 </MDBModalHeader>
    //                 <MDBModalBody>
    //                   <p>
    //                     <div class="clearfix">
    //                       <img
    //                         src="../assets/images/piggy.jpg"
    //                         class="col-md-6 float-md-end mb-3 ms-md-3"
    //                         alt="..."
    //                       />
    //                       There are several types of feed that can be used
    //                       to fatten pigs faster and enhance their growth.
    //                       These include: Corn: Corn is a highly digestible
    //                       and energy-dense feed that is commonly used in pig
    //                       diets. It provides pigs with the necessary
    //                       carbohydrates to support their growth and helps to
    //                       increase weight gain.
    //                     </div>
    //                   </p>
    //                 </MDBModalBody>
    //                 <MDBModalFooter>
    //                   <MDBBtn color="secondary" onClick={toggleOpen1}>
    //                     Close
    //                   </MDBBtn>
    //                 </MDBModalFooter>
    //               </MDBModalContent>
    //             </MDBModalDialog>
    //           </MDBModal>
    //         </MDBCardBody>
    //       </MDBCard>
    //     </div>
    //     <div className="col-md-4">
    //       {" "}
    //       <MDBCard>
    //         <MDBRipple
    //           rippleColor="light"
    //           rippleTag="div"
    //           className="bg-image hover-overlay"
    //         >
    //           <MDBCardImage src="../assets/images/5.jpeg" fluid alt="..." />
    //           <a>
    //             <div
    //               className="mask"
    //               style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
    //             ></div>
    //           </a>
    //         </MDBRipple>
    //         <MDBCardBody>
    //           <MDBCardTitle>Pig feed from food waste</MDBCardTitle>
    //           <MDBCardText>Are there any risk involved?</MDBCardText>
    //           <MDBBtn onClick={toggleOpen2}>Description</MDBBtn>

    //           {/* THIS IS MODAL 2 */}
    //           <MDBModal
    //             tabIndex="-1"
    //             open={centredModal2}
    //             setOpen={setCentredModal2}
    //           >
    //             <MDBModalDialog centered>
    //               <MDBModalContent>
    //                 <MDBModalHeader>
    //                   <MDBModalTitle>Did you know?</MDBModalTitle>
    //                   <MDBBtn
    //                     className="btn-close"
    //                     color="none"
    //                     onClick={toggleOpen2}
    //                   ></MDBBtn>
    //                 </MDBModalHeader>
    //                 <MDBModalBody>
    //                   <div class="clearfix">
    //                     <img
    //                       src="../assets/images/5.jpeg"
    //                       class="col-md-6 float-md-end mb-3 ms-md-3"
    //                       alt="..."
    //                     />
    //                     The robustness of pigs does not mean that they are
    //                     immune to diseases that can be transmitted via food.
    //                     Domestic pigs today are a result of breeding
    //                     practices that have traded the sturdiness of wild
    //                     boars for faster growth and better feed conversion
    //                     ratios.3 Besides, food waste today is as complex as
    //                     our food system itself. It is no longer a benign mix
    //                     of peels and trimmings that come from traceable
    //                     origins.
    //                   </div>
    //                 </MDBModalBody>
    //                 <MDBModalFooter>
    //                   <MDBBtn color="secondary" onClick={toggleOpen2}>
    //                     Close
    //                   </MDBBtn>
    //                 </MDBModalFooter>
    //               </MDBModalContent>
    //             </MDBModalDialog>
    //           </MDBModal>
    //         </MDBCardBody>
    //       </MDBCard>
    //     </div>
    //   </div>
  );
};

export default Articles;
