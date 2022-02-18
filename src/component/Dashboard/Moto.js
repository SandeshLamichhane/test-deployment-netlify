import React from 'react';
import './Moto.css'
import hcbgImage from '../../../src/images/boy.jpg'
import { FaFly, FaFire, FaSkiing, FaBug } from "react-icons/fa";
import { IconContext } from "react-icons";

export default function Moto() {
    return <div className='secstart'>

        <section>
            <div className="box">
                <h3>
                    Our Moto
                </h3>

                <div className="list">
                    <FaFly size={70} color="orange" />

                    <div className='content'>
                        <h4>
                            "पैसाले सुख किन्न सक्दैन तर विना पैसा सुखी बन्नपनि सकिदैन"
                        </h4>
                        {/* <p> antodaya  </p> */}
                    </div>
                </div>

                <div className="list">
                    <FaFire size={70} color="orange" />

                    <div className='content'>
                        <h4>
                            "संसार बदल्न छ भने आफैबाट सुरु गर्नुपर्छ"
                        </h4>
                        {/* <p> antodaya  </p> */}
                    </div>
                </div>

                <div className="list">
                    <FaSkiing size={70} color="orange" />

                    <div className='content'>
                        <h4>
                            "सबको साथ, सबको विश्वास र सबको प्रयासबाट नै समृद्धि आउने गर्छ"
                        </h4>
                        {/* <p> antodaya  </p> */}
                    </div>
                </div>

                <div className="list">

                    <FaBug size={70} color="orange" />

                    <div className='content'>
                        <h4>
                            "जस्तो आत्मा आफ्नो भित्र हुन्छ त्यस्तै आत्मा अरुको भित्र पनि हुन्छ"
                        </h4>
                        {/* <p> antodaya  </p> */}
                    </div>
                </div>



            </div>
        </section>


    </div>;
}
