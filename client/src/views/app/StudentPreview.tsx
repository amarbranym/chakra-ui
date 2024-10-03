/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef } from 'react'
import { StrapiDocument } from '../../strapi/providers/StrapiDocument'
import { useParams } from 'react-router-dom'
import { Box, Button, ButtonGroup, Center, Container, Divider, Heading, HStack, ListItem, Stack, Table, Tbody, Td, Text, Th, Tr, UnorderedList, useClipboard, VStack } from '@chakra-ui/react'
import moment from 'moment'
import "../../style.css"
import { extractCountryCode, formatDateDD_MM_YYYY } from '../../strapi/utils/service'




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

    const { onCopy, value, setValue, hasCopied } = useClipboard('')

    useEffect(() => {
        setValue('https://admin.bemployed.in/#/student/preview/' + id)
    }, [])

    


    return (
        <Box overflow={"hidden"} h="100vh" w="100vw">
            <Center id="controls" zIndex={1000} bg="white" py={3} className='print:hidden noprint' pos={"fixed"} bottom={0} right={0} left={0}>
                <ButtonGroup>
                    <Button colorScheme='blackAlpha' bg="black" variant={"solid"} onClick={() => {
                        window.print()
                    }} >Download/ Print</Button>
                    <Button colorScheme='gray' variant={"outline"} onClick={onCopy} >{hasCopied ? "Copied!" : "Copy Link"}</Button>
                </ButtonGroup>
            </Center>
            <Container maxW='container.xl' pb="20" h="100vh" w="100vw" position={"relative"} overflow={"scroll"}>

            <Box transform={["scale(0.5)", "scale(1)", "scale(1)"]} className='print:!transform-none mx-auto' w="21cm">
            <StrapiDocument slug={id} collectionName='students' query="populate=experience.Company.Contacts,experience.Company.City,experience.Company.Industry,experience.Designation,Skills,qualification.school,qualification.qualification,Contacts,Address,Address.City,Company,IndustriesPreference">
                {({ data }) => (
                    <div style={{minHeight: "297mm"}} className='page-container py-10  shadow-xl print:shadow-none '>
                        <div className="page-footer">
                            <div>Candidate Id: {id}</div>
                            <div>|</div>
                            <div>Date : {formatDateDD_MM_YYYY(currentDate)}</div>
                            <div>|</div>
                            <div>Place : Sri Ganganagar</div>
                            <div>|</div>
                            <div className='font-bold'>Bemployed</div>
                        </div>
                        <table className='table w-full'>
                            <tbody>
                                <tr>
                                    <td>
                                        <div className="">
                                            <div className=' '>
                                                <div className='text-center flex flex-col gap-1 mb-10'>
                                                    <h1 className=' text-3xl font-bold mt-4 mb-2'>{data?.FirstName} {data?.LastName}</h1>
                                                    <p className='text-sm '> 
                                                        {data.Email}
                                                        {
                                                            data?.Contacts?.filter((phone:any) => phone.Type === "Primary").map((phone: any) => (
                                                                <span key={phone.Number} className='text-sm '> • {extractCountryCode(phone.CountryCode)} {phone.Number}</span>
                                                            ))
                                                        }
                                                    </p>
                                                    <p className='text-sm max-w-lg mx-auto'>{data?.Address?.Street}, {data?.Address?.City?.data?.attributes?.Name}</p>

                                                </div>
                                                
                                                <hr className='mb-6'/>

                                                {
                                                    (data?.CandidateType === "Blue Collar" || data?.CandidateType === "White Collar") && <>
                                                        <Heading size="sm" textTransform={"uppercase"} mb={2}>Career Objective</Heading>
                                                        <div>
                                                            <p>
                                                            To pursue a challeging career and be a part of a progresive organization that gives scope to enhance my knowledge, skills and reach the pinnacle in this field  with sheer determination, dedication and hard work.
                                                            </p>
                                                        </div>
                                                    </>
                                                }

                                                <hr className='mt-4 mb-6'/>

                                                {
                                                    data?.qualification?.length > 0 && (
                                                        <>
                                                            {/* {console.log('data', data)} */}

                                                            <Heading size="sm" textTransform={"uppercase"} mb={2}>Academic Qualifications</Heading>
                                                            <div className='flex flex-col gap-1'>
                                                                {
                                                                    data?.qualification?.map((item: any) => (
                                                                        <div key={item.id}>
                                                                            <span className='mr-4'>➣</span>
                                                                            {item.qualification?.data?.attributes?.Name}, 
                                                                            {item.school?.data?.attributes?.Name}
                                                                            {item?.Score && <span> - ({item.Score}%)</span>}
                                                                        </div>
                                                                    ))
                                                                }

                                                            </div>

                                                        </>
                                                    )
                                                }

                                                <hr className='mt-4 mb-6'/>

                                                {
                                                    data?.experience?.length > 0 && <>
                                                        <Heading size="sm" textTransform={"uppercase"} mb={2}>Experience</Heading>
                                                        <div className='flex flex-col gap-1'>
                                                            {data?.experience.map((item: any) => (
                                                                <div key={item.id}> 
                                                                    <span className='mr-4'>➣</span>
                                                                    <span>
                                                                        {item.Duration < 12 ? <>
                                                                            {item.Duration} Month{item.Duration > 1 && "s"}
                                                                        </> : <>
                                                                            {Math.floor(item.Duration / 12)} Year{Math.floor(item.Duration / 12) > 1 && "s"} 
                                                                            {item.Duration % 12 > 0 && <span> and {item.Duration % 12} Month{item.Duration % 12 > 1 && "s"}</span>}
                                                                        </>}
                                                                    </span>
                                                                    <span> of experience in </span>
                                                                    {item?.Company?.data?.attributes?.Name}
                                                                    <span> as a </span>
                                                                    {item.Designation?.data?.attributes?.Name}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </>
                                                }

                                                <hr className='mt-4 mb-6'/>

                                                {
                                                    data?.Skills?.data.length > 0 && (
                                                        <>
                                                            <Heading size="sm" textTransform={"uppercase"} mb={2}>Skills & Achievements</Heading>
                                                            <div >
                                                                {
                                                                    data?.Skills?.data.map((skill: any) => (
                                                                        <div key={skill.id}>
                                                                            <span className='mr-4'>➣</span>
                                                                            {skill?.attributes?.name}
                                                                        </div>
                                                                    ))
                                                                }

                                                            </div>
                                                        </>
                                                    )

                                                }

                                                <hr className='mt-4 mb-6'/> 

                                                <Heading size="sm" textTransform={"uppercase"} mb={2}>Personal Details</Heading>
                                                <table cellPadding={"4px"} className='w-2/3 text-md -mx-1'>
                                                    <tbody className='text-left' >
                                                        <tr className=''>
                                                            <th className="font-semibold text-gray-900 ">FatherName:</th>
                                                            <td className="">{data?.FatherName}</td>
                                                        </tr>
                                                        <tr className=' '>
                                                            <th className="font-semibold text-gray-900 ">Date of Birth:</th>
                                                            <td className="    ">
                                                                {formatDateDD_MM_YYYY(data?.DOB)}
                                                            </td>
                                                        </tr>
                                                        <tr className=' '>
                                                            <th className="font-semibold text-gray-900 ">Gender:</th>
                                                            <td className="">{data?.Gender}</td>
                                                        </tr>
                                                        <tr className=' '>
                                                            <th className="font-semibold text-gray-900 ">Marital Status:</th>
                                                            <td className="">{data?.MaritalStatus}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <br />
                                                <br />
                                                <div className=' '>
                                                    <span>Signature</span>
                                                </div>
                                            </div>
                                        </div>
{/*                                         
                                        <div style={{ breakAfter: "page" }}></div>
                                      
                                        <div className="relative mt-10">
                                            <div className='  min-h-full'>
                                                <h2 className='text-2xl font-bold text-center '> Terms & Conditions </h2>
                                                <ol className=' px-6 mt-12 list-decimal flex flex-col gap-6'>
                                                    {termsAndConditions.map((item, index) => (
                                                        <li key={index} >{item}</li>
                                                    ))}
                                                </ol>
                                                <br />
                                                <br />
                                                <div className=' '>
                                                    <span>Signature</span>
                                                </div>
                                            </div>
                                        </div> */}
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
            </Box>        
    
        </Container>
        </Box>
    )
}

export default StudentPreview
