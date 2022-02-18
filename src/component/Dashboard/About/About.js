import React from 'react'
import Logo from '../../../../src/images/logo.png'
import './About.css'

import { Link, useNavigate } from "react-router-dom"
export default function About() {
    return (
        <div className='abt-wrapper'>

            <div className='about-main-box'>


                <Link to="/">
                    <span className='go-back'>
                        Home
                    </span>
                </Link>
                <div className='about-box'>
                    <h2>
                        आधिखोला क्लव बारेमा
                    </h2>
                    <img src={Logo} className="abt-logo" alt="logo" />
                    <p>
                        हामी एक सामाजिक सेवामा समर्पित गैरसरकारी  क्लब हो जसको प्रधान कार्यलय स्याङ्जा जिल्लामा रहेको छ | समाजका युवायुवतीवाट संचालित यस क्लबको विशेषता :
                    </p>
                    <ul className=''>
                        <li>
                            <strong>
                                मुल्य र मान्यता  :
                            </strong>
                            हाम्रा सबै कर्म, पर्मार्थको लागि हुन |
                        </li>

                        <li>
                            <strong>
                                क्रियाकलापहरु  :
                            </strong>
                            यस क्लवले समय-समयमा भलिबल, फूटबल , दोहोरी प्रतियोगिता जस्ता  क्रियाकलापहरु संचालन गर्ने गर्छ |
                        </li>

                        <li>
                            <strong>
                                मानवीय सेवा  :
                            </strong>
                            सबैको घरमा शुद्ध पानी पुर्याउने, सबैको घरमा चर्पी बनाउनेगरी र दुखपरेकोलाई आर्थिक र भौतिक सहयोग गर्ने  |
                        </li>

                        <li>
                            <strong>
                                चेतना फैलाउने  :
                            </strong>
                            समाजबाट कुरीति, कुप्रथा र भेदभाव हटाउन जनचेतनामुलक कार्यक्रमहरु संचालन गर्ने   |
                        </li>



                    </ul>
                </div>
            </div>
        </div>
    )
}
