import React from 'react';
import {Container, Carousel, Image} from 'react-bootstrap'
import image_1 from "./assets/img/image_1.jpg"
import image_2 from "./assets/img/image_2.jpg"
import image_3 from "./assets/img/image_3.jpg"
import "./MainPage.css"

const MainPage = () => {

    return (
        <Container fluid>

            <Container fluid>
                <Carousel variant="dark">
                    <Carousel.Item>
                        <Image
                            className="d-block w-100"
                            src={image_1}
                            alt="First slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <Image
                            className="d-block w-100"
                            src={image_2}
                            alt="Second slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <Image
                            className="d-block w-100"
                            src={image_3}
                            alt="First slide"
                        />
                    </Carousel.Item>
                </Carousel>
            </Container>

        </Container>


    )

}

export default MainPage;