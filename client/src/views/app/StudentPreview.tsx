/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef } from 'react'
import { StrapiDocument } from '../../strapi/providers/StrapiDocument'
import { useParams } from 'react-router-dom'
import { Box, Button, Container, Divider, Heading, HStack, ListItem, Stack, Table, Tbody, Td, Text, Th, Tr, UnorderedList, VStack } from '@chakra-ui/react'
import moment from 'moment'
import "../../style.css"
import Horizontalline from '../../layout/Horizontalline'
import { extractCountryCode } from '../../strapi/utils/service'
const termsAndConditions = [
    "If a candidate is interested in applying for any job, they must submit their resume along with an ID Proof, Passport Size Photo, and a consultancy fee of Rs. 500/-.",
    "When attending an interview, candidates must mention our consultancy name so that the company is promptly informed.",
    "If a candidate is selected based on our recommendations or references, they must inform our consultancy for our records by directly notifying our team or any concerned person from Bemployed.",
    "If a candidate is selected through our consultancy, they will be a full-time employee of the respective organization. Bemployed will not be responsible for any legal disputes or any other matters between the candidate and the organization.",
    "If a candidate is hired by our client's company through our reference, it is the candidate's responsibility to submit one-third of their first month's salary to Bemployed.",
    "If a candidate is employed by a client's company through our reference, we cannot place that candidate in another company until their employment with the current company ends.",
    "Once a candidate is registered with Bemployed, they cannot request a refund of the registration fee. (मेरे द्वारा दी गई वर्किंग फीस 500 रूपये कभी वापिस नहीं मांगूंगा और जॉब लगने के बाद अपनी सैलरी का एक तिहाई हिस्सा ईमानदारी से दे दूंगा)"
];
const StudentPreview = () => {
    const { id } = useParams()
    const currentDate = moment().format('YYYY-MM-DD')
    // Automatically trigger print preview when the component mounts
  





    return (
        <Container maxW='container.xl ' mb="20" position={"relative"}  >
            <div className='print:hidden bg-red-50 fixed  right-[10%] top-10 '>
                <Button colorScheme='blue' onClick={() => window.print()} >Print</Button>
            </div>
            <StrapiDocument slug={id} collectionName='students' query="populate=experience.Company.Contacts,experience.Company.City,experience.Company.Industry,experience.Designation,Skills,qualification.school,qualification.qualification,Contacts,Address,Address.City,Company,IndustriesPreference">
                {({ data }) => (
                    <div className='page-container  py-10 mx-auto  shadow-xl print:shadow-none '>
                        <div className="page-footer">
                            <div>Candidate Id: {id}</div>
                            <div>|</div>
                            <div>Date : {currentDate}</div>
                            <div>|</div>
                            <div>Place : Sri Ganganagar</div>
                            <div>|</div>
                            <div className='font-bold'>Bemployed</div>
                        </div>
                        <table className='table '>
                            <tbody>
                                <tr>
                                    <td>
                                        <div className="">
                                            <div className=' '>
                                                <div className='flex flex-col gap-1'>
                                                    <h1 className=' text-2xl font-bold '>{data?.FirstName} {data?.LastName}</h1>
                                                    <p className='text-sm '> Email: {data.Email}</p>
                                                    <p className='text-sm text-balance '>  {data?.Address?.Street}</p>

                                                   {
                                                        data?.Contacts?.slice(0, 2).map((phone: any) => (
                                                            <p key={phone.Number} className='text-sm '>  Mob: {extractCountryCode(phone.CountryCode)} {phone.Number}</p>
                                                        ))
                                                    }

                                                </div>
                                                {
                                                    data?.experience?.length > 0 && <>
                                                        <Horizontalline text="Career Objective" />
                                                        <div>
                                                            <p>
                                                                To pursue a challeging career and be a part of a progresive organization that gives scope to enhance my knowledge, skills and reach the pinnacle in this field  with sheer determination, dedication and hard work.
                                                            </p>
                                                        </div>
                                                    </>
                                                }


                                                {
                                                    data?.qualification?.length > 0 && (
                                                        <>
                                                            <Horizontalline text="Qualification" />
                                                            <div className='flex flex-col gap-1'>
                                                                {
                                                                    data?.qualification?.map((item: any) => (
                                                                        <div className='flex items-center gap-4' key={item.id}>

                                                                            <li > {item.qualification?.data?.attributes?.Name}, {item.school?.data?.attributes?.Name} </li>
                                                                            {item?.Score && <p >- ({item.Score}%) </p>}
                                                                        </div>
                                                                    ))
                                                                }

                                                            </div>

                                                        </>
                                                    )
                                                }


                                                {
                                                    data?.experience?.length > 0 && <>
                                                        <Horizontalline text="Experience" />
                                                        <div>
                                                            {data?.experience.map((item: any) => (
                                                                <li key={item.id}> {item.Duration === 12 ? "1 Year " : `${item?.Duration} Month`} experience of  {item?.Company?.data?.attributes?.Name}</li>
                                                            ))}
                                                        </div>
                                                    </>
                                                }


                                                {
                                                    data?.Skills?.data.length > 0 && (
                                                        <>
                                                            <Horizontalline text="Skills" />
                                                            <div >
                                                                {
                                                                    data?.Skills?.data.map((skill: any) => (
                                                                        <li key={skill.id}>{skill?.attributes?.name}</li>
                                                                    ))
                                                                }

                                                            </div>
                                                        </>
                                                    )

                                                }

                                                <Horizontalline text='Personal Details' />
                                                <table className=' w-1/2 '>
                                                    <tbody className='  ' >
                                                        <tr className=''>
                                                            <th className=" py-2  pr-3 text-left text-sm font-semibold text-gray-900 ">FatherName:</th>
                                                            <td className="  py-2  pr-3 text-left text-sm  ">{data?.FatherName}</td>
                                                        </tr>
                                                        <tr className=' '>
                                                            <th className=" py-2  pr-3 text-left text-sm font-semibold text-gray-900 ">Date of Birth:</th>
                                                            <td className="  py-2  pr-3 text-left text-sm   ">
                                                                {data?.DOB}
                                                            </td>
                                                        </tr>
                                                        <tr className=' '>
                                                            <th className="  py-2  pr-3 text-left text-sm font-semibold text-gray-900 ">Gender:</th>
                                                            <td className="  py-2  pr-3 text-left text-sm  ">{data?.Gender}</td>
                                                        </tr>
                                                        <tr className=' '>
                                                            <th className=" py-2  pr-3 text-left text-sm font-semibold text-gray-900 ">Marital Status:</th>
                                                            <td className="  py-2  pr-3 text-left text-sm   ">{data?.MaritalStatus}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <div className=' '>
                                                    <span>Signature</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{ breakAfter: "page" }}></div>
                                        <div className='print:hidden'>
                                            <br />
                                            <br />
                                            <br />
                                            <hr />
                                        </div>
                                        <div className=" relative mt-10">
                                            <div className='  min-h-full'>
                                                <h2 className='text-2xl font-bold text-center '> Terms & Conditions </h2>
                                                <ol className=' px-6 mt-12 list-decimal flex flex-col gap-6'>
                                                    {termsAndConditions.map((item, index) => (
                                                        <li key={index} >{item}</li>
                                                    ))}
                                                </ol>
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <div className=' '>
                                                    <span>Signature</span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>

                            <tfoot>
                                <tr>
                                    <td>
                                        <div className="page-footer-space"></div>
                                    </td>
                                </tr>
                            </tfoot>

                        </table>
                    </div>


                )}

            </StrapiDocument>
        </Container>
    )
}

export default StudentPreview
