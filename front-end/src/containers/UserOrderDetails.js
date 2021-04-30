import OrderDetailsInformationList from 'components/OrderDetailsInformationList';
import React, { useState }         from 'react';
import SideBar                     from '../components/SideBar';

const UserOrderDetails = (props) => {
  const [data, setData] = useState(
    {
      order_id: '120191',
      created : '01-08-2019',
      user_id : '1234',
      status  : 'Reject',

    },
  );

  const [datastatus, setDatastatus] = useState(
    {
      status     : 'Your order is Rejected',
      description: 'The form is incomplete, some information is missing'

    },
  );

  return (
    <SideBar active="Orders">
      <OrderDetailsInformationList data={data} />

      {/* <DepositPayment datastatus={datastatus}/> */}

      {/* <OrderRejectDesciption datastatus={datastatus} />  */}
      {/* <DocumentSubmission datastatus={datastatus} /> */}

      {/* <OrderPayment datastatus={datastatus}/>   */}

      {/* <OrderProcessing datastatus={datastatus} /> */}
      {/* <OrderDispatched datastatus={datastatus}/> */}
      {/* <OrderDelivered  datastatus={datastatus}/> */}
    </SideBar>

  );
};

export default UserOrderDetails;
