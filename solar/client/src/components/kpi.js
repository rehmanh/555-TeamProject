import { motion } from "framer-motion";
import { BsHammer, BsClipboard2CheckFill, BsClipboard2PlusFill } from "react-icons/bs";
import {
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBRow,
    MDBCol
} from 'mdb-react-ui-kit';
import React, { Component, useState, useEffect } from "react";
const boxVariant = {
    visible: { opacity: 1, scale: 1, transition: { duration: 1 } },
    hidden: { opacity: 0, scale: 0 },
};
export default function OpManager() {
    const [kpiData, setKpiData] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://vmossb47vc.execute-api.us-east-1.amazonaws.com/UAT');
                const data = await response.json();
                setKpiData(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);
    const handleClick = () => {
        console.log("Card clicked!");
    }
    return (
        <MDBRow className="mt-4 text-center">
            <MDBCol sm='3'>
                <motion.div
                    className="box"
                    variants={boxVariant}
                    initial="hidden"
                    animate="visible"
                >
                    <MDBCard className="kpicard" onClick={handleClick} alignment='center'>
                        <MDBCardBody>
                            <MDBCardTitle><BsClipboard2CheckFill />  In Progress:</MDBCardTitle>
                            <MDBCardText>
                                <p> {kpiData?.['IN-PROGRESS']}</p>
                            </MDBCardText>
                        </MDBCardBody>
                    </MDBCard>
                </motion.div >

            </MDBCol>
            <MDBCol sm='3'>
                <motion.div
                    className="box"
                    variants={boxVariant}
                    initial="hidden"
                    animate="visible"
                >
                    <MDBCard className="kpicard" alignment='center'>
                        <MDBCardBody>
                            <MDBCardTitle><BsClipboard2CheckFill />  Done:</MDBCardTitle>
                            <MDBCardText>
                                <p>{kpiData?.DONE}</p>
                            </MDBCardText>
                        </MDBCardBody>
                    </MDBCard>
                </motion.div >
            </MDBCol>
            <MDBCol sm='3'>
                <motion.div
                    className="box"
                    variants={boxVariant}
                    initial="hidden"
                    animate="visible"
                >
                    <MDBCard className="kpicard" alignment='center'>
                        <MDBCardBody>
                            <MDBCardTitle><BsClipboard2CheckFill />  Payment Done: </MDBCardTitle>
                            <MDBCardText>
                                <p>{kpiData?.['PAYMENT-DONE']}</p>
                            </MDBCardText>
                        </MDBCardBody>
                    </MDBCard>
                </motion.div >
            </MDBCol>
            <MDBCol sm='3'>
                <motion.div
                    className="box"
                    variants={boxVariant}
                    initial="hidden"
                    animate="visible"
                >
                    <MDBCard className="kpicard" alignment='center'>
                        <MDBCardBody>
                            <MDBCardTitle><BsClipboard2CheckFill />  Initiated:</MDBCardTitle>
                            <MDBCardText>
                                <p>{kpiData?.INITIATED}</p>
                            </MDBCardText>
                        </MDBCardBody>
                    </MDBCard>
                </motion.div >
            </MDBCol>
        </MDBRow>



    )
}

