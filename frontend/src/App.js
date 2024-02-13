import React, { useState } from 'react';
import { MDBBtn, MDBContainer } from 'mdb-react-ui-kit';
import Header from './component/Header';
import { MDBRipple, MDBIcon } from 'mdb-react-ui-kit';

import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage
} from 'mdb-react-ui-kit';

import {
  MDBFooter,
  MDBInput,
  MDBCol,
  MDBRow,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter

} from 'mdb-react-ui-kit';


function App() {
  const [centredModal, setCentredModal] = useState(false);

  const [centredModal1, setCentredModal1] = useState(false);

  const [centredModal2, setCentredModal2] = useState(false);


  const toggleOpen = () => setCentredModal(!centredModal);
  const toggleOpen1 = () => setCentredModal1(!centredModal1);
  const toggleOpen2 = () => setCentredModal2(!centredModal2);
  return (
    <>
      <Header />
      <main class="my-5 gx-3">
        <div className="container">
          <div className="row">
            <div className="col-md-5 gx-3"  >
              <MDBRipple
                className='bg-image hover-overlay shadow-1-strong rounded'
                rippleTag='div'
                rippleColor='primary'
              >
                <img src='https://mdbootstrap.com/img/new/fluid/city/113.webp' className='w-100' />
                <a href='#!'>
                  <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.2)' }}></div>
                </a>
              </MDBRipple>

            </div>
            <div className="col-md-7">
              <h3>My Ending Shit</h3>
              <p class="text-muted" >It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
              <hr />

              <p class="text-muted"> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1580.</p>

              <MDBBtn outline rounded >
                Learn More <MDBIcon fas icon="book-open" />
              </MDBBtn>
            </div>
          </div>

          <div className="row my-5" >
            <div className="col-md-4 " > <MDBCard>
              <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
                <MDBCardImage src='https://mdbootstrap.com/img/new/standard/nature/111.webp' fluid alt='...' />
                <a>
                  <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
                </a>
              </MDBRipple>
              <MDBCardBody>
                <MDBCardTitle>Card title</MDBCardTitle>
                <MDBCardText>
                  Some quick example text to build on the card title and make up the bulk of the card's content.
                </MDBCardText>
                {/* this is modal  */}

                <MDBBtn onClick={toggleOpen}>Description</MDBBtn>

                <MDBModal tabIndex='-1' open={centredModal} setOpen={setCentredModal}>
                  <MDBModalDialog centered size=''>
                    <MDBModalContent>
                      <MDBModalHeader>
                        <MDBModalTitle>Description</MDBModalTitle>
                        <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
                      </MDBModalHeader>
                      <MDBModalBody>
                        <p>
                          Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
                          egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                        </p>
                      </MDBModalBody>
                      <MDBModalFooter>
                        <MDBBtn color='secondary' onClick={toggleOpen}>
                          Close
                        </MDBBtn>
                      </MDBModalFooter>
                    </MDBModalContent>
                  </MDBModalDialog>
                </MDBModal>

              </MDBCardBody>
            </MDBCard></div>
            <div className="col-md-4"> <MDBCard>
              <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
                <MDBCardImage src='https://mdbootstrap.com/img/new/standard/nature/111.webp' fluid alt='...' />
                <a>
                  <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
                </a>
              </MDBRipple>
              <MDBCardBody>
                <MDBCardTitle>Card title</MDBCardTitle>
                <MDBCardText>
                  Some quick example text to build on the card title and make up the bulk of the card's content.
                </MDBCardText>
                <MDBBtn onClick={toggleOpen1}>Description</MDBBtn>
                {/* THIS IS MODAL 1 */}
                <MDBModal tabIndex='-1' open={centredModal1} setOpen={setCentredModal1}>
                  <MDBModalDialog centered>
                    <MDBModalContent>
                      <MDBModalHeader>
                        <MDBModalTitle>Title</MDBModalTitle>
                        <MDBBtn className='btn-close' color='none' onClick={toggleOpen1}></MDBBtn>
                      </MDBModalHeader>
                      <MDBModalBody>
                        <p>
                          Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
                          egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                        </p>
                      </MDBModalBody>
                      <MDBModalFooter>
                        <MDBBtn color='secondary' onClick={toggleOpen1}>
                          Close
                        </MDBBtn>
                      </MDBModalFooter>
                    </MDBModalContent>
                  </MDBModalDialog>
                </MDBModal>
              </MDBCardBody>
            </MDBCard></div>
            <div className="col-md-4"> <MDBCard>
              <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
                <MDBCardImage src='https://mdbootstrap.com/img/new/standard/nature/111.webp' fluid alt='...' />
                <a>
                  <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
                </a>
              </MDBRipple>
              <MDBCardBody>
                <MDBCardTitle>Card title</MDBCardTitle>
                <MDBCardText>
                  Some quick example text to build on the card title and make up the bulk of the card's content.
                </MDBCardText>
                <MDBBtn onClick={toggleOpen2}>Description</MDBBtn>

                {/* THIS IS MODAL 2 */}
                <MDBModal tabIndex='-1' open={centredModal2} setOpen={setCentredModal2}>
                  <MDBModalDialog centered>
                    <MDBModalContent>
                      <MDBModalHeader>
                        <MDBModalTitle>Modal title</MDBModalTitle>
                        <MDBBtn className='btn-close' color='none' onClick={toggleOpen2}></MDBBtn>
                      </MDBModalHeader>
                      <MDBModalBody>
                        <p>
                          Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
                          egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                        </p>
                      </MDBModalBody>
                      <MDBModalFooter>
                        <MDBBtn color='secondary' onClick={toggleOpen2}>
                          Close
                        </MDBBtn>
                      </MDBModalFooter>
                    </MDBModalContent>
                  </MDBModalDialog>
                </MDBModal>
              </MDBCardBody>
            </MDBCard></div>

          </div>
        </div>
      </main>
      <footer>
        <MDBFooter className='text-center' color='white' bgColor='dark'>
          <MDBContainer className='p-4'>
            <section className='mb-4'>
              <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
                <MDBIcon fab icon='facebook-f' />
              </MDBBtn>

              <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
                <MDBIcon fab icon='twitter' />
              </MDBBtn>

              <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
                <MDBIcon fab icon='google' />
              </MDBBtn>

              <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
                <MDBIcon fab icon='instagram' />
              </MDBBtn>

              <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
                <MDBIcon fab icon='linkedin-in' />
              </MDBBtn>

              <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
                <MDBIcon fab icon='github' />
              </MDBBtn>
            </section>

            <section className=''>
              <form action=''>
                <MDBRow className='d-flex justify-content-center'>
                  <MDBCol size="auto">
                    <p className='pt-2'>
                      <strong>Sign up for our newsletter</strong>
                    </p>
                  </MDBCol>

                  <MDBCol md='5' start>
                    <MDBInput contrast type='email' label='Email address' className='mb-4' />
                  </MDBCol>

                  <MDBCol size="auto">
                    <MDBBtn outline color='light' type='submit' className='mb-4'>
                      Subscribe
                    </MDBBtn>
                  </MDBCol>
                </MDBRow>
              </form>
            </section>

            <section className='mb-4'>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt distinctio earum repellat quaerat
                voluptatibus placeat nam, commodi optio pariatur est quia magnam eum harum corrupti dicta, aliquam
                sequi voluptate quas.
              </p>
            </section>

            <section className=''>
              <MDBRow>
                <MDBCol lg='3' md='6' className='mb-4 mb-md-0'>
                  <h5 className='text-uppercase'>Links</h5>
                </MDBCol>

                <MDBCol lg='3' md='6' className='mb-4 mb-md-0'>
                  <h5 className='text-uppercase'>Links</h5>

                </MDBCol>

                <MDBCol lg='3' md='6' className='mb-4 mb-md-0'>
                  <h5 className='text-uppercase'>Links</h5>


                </MDBCol>

                <MDBCol lg='3' md='6' className='mb-4 mb-md-0'>
                  <h5 className='text-uppercase'>Links</h5>


                </MDBCol>
              </MDBRow>
            </section>
          </MDBContainer>

          <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
            © 2020 Copyright:
            <a className='text-white' href='https://mdbootstrap.com/'>
              MDBootstrap.com
            </a>
          </div>
        </MDBFooter>
      </footer>
    </>
  );
}

export default App;
