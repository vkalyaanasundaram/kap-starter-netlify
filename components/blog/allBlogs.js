import Head from "next/head";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

import Image from "next/image";
// import Pagination from 'next-pagination'

// var dateFormat = require("dateformat");

function postPagination(posts) {
  const allBlogs = posts.posts;
  // console.log(allBlogs);

  return (
    <div>
      <div>
        <Head>
          <title> Next.js - Kapitus</title>
        </Head>

        <div className="grid grid-cols-3 gap-4">
          {allBlogs.map((key, index) => (
            <div
              key={index}
              dangerouslySetInnerHTML={{
                __html: key.title.rendered,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default postPagination;
