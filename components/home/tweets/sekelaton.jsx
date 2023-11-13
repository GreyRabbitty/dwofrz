import React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

export default function sekeleton() {
  return (
    <div className="grid place-items-start -mt-20">
      <Stack spacing={-8}>
        <Skeleton
          sx={{ bgcolor: "grey.900" }}
          animation="pulse"
          width={200}
          height={380}
        />
        <div className="sm:w-[185px] md:w-[200px]">
          <div className="w-full flex-row-reverse flex items-center justify-between">
            <div className="">
              <Skeleton
                className="-mt-1"
                sx={{ bgcolor: "grey.900" }}
                animation="pulse"
                width={55}
                height={15}
              />
            </div>
            <div className="flex items-center">
              <Skeleton
                variant="circular"
                sx={{ bgcolor: "grey.900" }}
                animation="pulse"
                width={25}
                height={25}
              />
              <Skeleton
                variant="circular"
                sx={{ bgcolor: "grey.900" }}
                animation="pulse"
                width={25}
                height={25}
              />
              <Skeleton
                variant="circular"
                sx={{ bgcolor: "grey.900" }}
                animation="pulse"
                width={25}
                height={25}
              />
              {/* <Skeleton
                variant="circular"
                sx={{ bgcolor: "grey.900" }}
                animation="pulse"
                width={25}
                height={25}
              /> */}
            </div>
          </div>
        </div>
      </Stack>
      {/* <Skeleton
        sx={{ bgcolor: "grey.900" }}
        animation="pulse"
        width={160}
        height={200}
      />
      <Skeleton
        sx={{ bgcolor: "grey.900", pt: 0 }}
        animation="pulse"
        width={90}
        height={20}
      />
      <Skeleton
        sx={{ bgcolor: "grey.900" }}
        animation="pulse"
        width={70}
        height={20}
      /> */}
    </div>
  );
}
