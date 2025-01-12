import React from "react";
import { Tabs } from "antd";
import CreateResult from "./CreateResult";
import PrintResult from "./PrintResult";
import { PrinterOutlined } from "@ant-design/icons";
import { FaLaptopMedical } from "react-icons/fa";
import { FaDatabase } from "react-icons/fa6";
import AllStudentsResultPage from "./AllStudentsResultPage";
import ChartVisulisation from "./ChartVisulisation";
import { FaChartPie } from "react-icons/fa";

const ResultPageTabs = () => (
  <Tabs
    type="card"
    items={[
      {
        label: (
          <span>
            <FaChartPie style={{ marginRight: 8 }} />
            View
          </span>
        ),
        key: "1",
        children: <ChartVisulisation />,
      },
      {
        label: (
          <span>
            <FaLaptopMedical style={{ marginRight: 8 }} />
            Create Result
          </span>
        ),
        key: "2",
        children: <CreateResult />,
      },
      {
        label: (
          <span>
            <FaDatabase style={{ marginRight: 8 }} />
            All Results
          </span>
        ),
        key: "3",
        children: <AllStudentsResultPage />,
      },

      {
        label: (
          <span>
            <PrinterOutlined style={{ marginRight: 8 }} />
            Print Result
          </span>
        ),
        key: "4",
        children: <PrintResult />,
      },
    ]}
  />
);

export default ResultPageTabs;
