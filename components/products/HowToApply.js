import React, { useEffect, useState } from "react";
import { useInView } from "react-cool-inview";
import { contentNav } from "../../styles/Home.module.css";

import { useRouter } from "next/router";

const HowToApply = ({ data }) => {
  //   console.log(data)
  return (
    <>
      <div id="HowApply">
        <div
          className="px-5 my-20"
          dangerouslySetInnerHTML={{
            __html: data,
          }}
        />
      </div>
    </>
  );
};

export default HowToApply;
