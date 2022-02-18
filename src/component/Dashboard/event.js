import React from 'react'
import Aadhiimage from '../../images/Adh.png'

export default function Event() {
    return (
        <div>

            <section class="text-gray-600 body-font">
                <div class="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                    <div class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                        <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900"> आधिखोला  क्लब

                        </h1>
                        <p class="mb-8 leading-relaxed">सबैको सारथि आधिखोला क्लब लो है स्बक्ध्सा क म बसिद मिउहसिदिऔस् इऊइअद्स इउ क्जिउअस्द iubknkdsabk no क्स्बदिक </p>
                        {/* <div class="flex justify-center">
                            <button class="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Button</button>
                            <button class="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">Button</button>
                        </div> */}
                    </div>
                    <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
                        <img class="object-cover object-center rounded" alt="hero" src={Aadhiimage} />
                    </div>
                </div>
            </section>
        </div>
    )
}
