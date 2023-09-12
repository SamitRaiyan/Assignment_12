import { Helmet } from "react-helmet";
import usePayments from "../../../Hooks/usePayments";

const PaymentHistory = () => {
  const [paymentHistory] = usePayments();

  console.log(paymentHistory);

  return (
    <div className="w-full h-full px-5">
      <Helmet>
        <title>Photography School | student paymentHistory</title>
        <link rel="canonical" href="https://www.tacobell.com/" />
      </Helmet>
      <div className="text-center my-6">
        <h1 className="text-3xl font-sans font-bold">
          Total Payment in Classes : {paymentHistory.length}
        </h1>
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Class Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>TransactionId</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map((item, index) => (
                <tr key={item._id}>
                  <th>{index + 1}</th>
                  <td>
                    <img className="w-22 h-12" src={item.classImage} alt="" />
                  </td>
                  <td>{item.className}</td>
                  <td className="text-orange-500 font-bold">${item.price}</td>
                  <td className="text-orange-500 font-bold">
                    {item.transactionId}
                  </td>
                  <td>
                    <button disabled className="btn btn-sm btn-success">
                      Paid
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
