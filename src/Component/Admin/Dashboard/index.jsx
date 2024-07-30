import React, { useEffect, useState } from "react";
import axios from "axios";
import CardDataStats from "./CardDataStats";
import Linechart from "./LineChart";

const Dashboard = () => {
  const [data, setData] = useState({
    totalItems: "0",
    totalCustomers: "0",
    totalPayments: "0",
    totalContacts: "0",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [itemsRes, customersRes, paymentsRes, contactsRes] =
          await Promise.all([
            axios.get("http://localhost:8080/items/count"),
            axios.get("http://localhost:8080/customers/count"),
            axios.get("http://localhost:8080/api/payment/count"),
            axios.get("http://localhost:8080/api/contact/count"),
          ]);

        setData({
          totalItems: itemsRes.data.data || "0",
          totalCustomers: customersRes.data.data || "0",
          totalPayments: paymentsRes.data.data || "0",
          totalContacts: contactsRes.data.data || "0",
        });
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h1 className="mx-4 text-2xl font-bold ">Dashboard</h1>

      <div className="m-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <CardDataStats
            title="Total Items"
            total={data.totalItems}
          ></CardDataStats>

          <CardDataStats
            title="Total Customers"
            total={data.totalCustomers}
          ></CardDataStats>

          <CardDataStats
            title="Total Payments"
            total={data.totalPayments}
          ></CardDataStats>

          <CardDataStats
            title="Total Contacts"
            total={data.totalContacts}
          ></CardDataStats>
        </div>
        <div className="my-4">
          <Linechart />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
