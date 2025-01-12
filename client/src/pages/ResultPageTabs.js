import React from "react";
import { Tabs } from "antd";
import CreateResult from "./CreateResult";
import PrintResult from "./PrintResult";
import { PrinterOutlined } from "@ant-design/icons";
import { FaDatabase } from "react-icons/fa6";
import { MdAssignmentAdd } from "react-icons/md";

import AllStudentsResultPage from "./AllStudentsResultPage";

const ResultPageTabs = () => (
  <Tabs
    type="card"
    items={[
      {
        label: (
          <span>
            <MdAssignmentAdd style={{ marginRight: 8 }} />
            Create Result
          </span>
        ),
        key: "1",
        children: <CreateResult />,
      },
      {
        label: (
          <span>
            <FaDatabase style={{ marginRight: 8 }} />
            All Results
          </span>
        ),
        key: "2",
        children: <AllStudentsResultPage />,
      },

      {
        label: (
          <span>
            <PrinterOutlined style={{ marginRight: 8 }} />
            Print Result
          </span>
        ),
        key: "3",
        children: <PrintResult />,
      },
    ]}
  />
);

export default ResultPageTabs;
