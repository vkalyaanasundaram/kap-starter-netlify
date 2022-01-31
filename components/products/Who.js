import React, { useEffect, useState } from "react";

import { contentNav } from "../../styles/Home.module.css";
import { useRouter } from "next/router";

const Who = ({ data }) => {
  //   console.log(data)
  return (
    <>
      <div id="Who">
        <div className="my-5">
          <hr />
        </div>
        <div
          className="container py-10 px-5"
          dangerouslySetInnerHTML={{
            __html: data,
          }}
        />
        <div>
          <hr />
        </div>
      </div>
    </>
  );
};

export default Who;
