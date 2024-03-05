import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function ResidentsCard({resident}) {
  return (
    <div className='recidents-card m-2'>
    <div className='card-heading'>{resident.name}</div>
    
    <Row className='my-4'>
       <Col className='text-center px-0'>
         <div className='detail-subtext'>Gender</div>
         <div className='card-subheading'>{resident.gender!== 'unknown' ?  resident.gender : '-'}</div>
       </Col>
       <Col className='text-center px-0'>
       <div className='detail-subtext'>Height</div>
         <div className='card-subheading'>{ resident.height !== 'unknown' ?  resident.height : '-'}</div>
       </Col>
       <Col className='text-center px-0'>
       <div className='detail-subtext'>Birth year</div>
         <div className='card-subheading'>{ resident.birth_year !== 'unknown' ?  resident.birth_year : '-'}</div>
       </Col>
    </Row>
 </div>
  )
}

export default ResidentsCard