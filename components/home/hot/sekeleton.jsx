import React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

export default function sekeleton() {
  return (
    <div className="grid place-items-start -mt-12">
      {/* <Skeleton variant="text" sx={{ fontSize: "1rem" }} /> */}
      {/* For other variants, adjust the size with `width` and `height` */}
      <div className="w-full flex justify-center">
        <Skeleton
          sx={{ bgcolor: "grey.900" }}
          animation="pulse"
          width={127}
          height={20}
        />
      </div>
      <Stack spacing={-6}>
        <Skeleton
          sx={{ bgcolor: "grey.900" }}
          animation="pulse"
          width={167}
          height={280}
        />
        <div className="w-full">
          <Stack>
            <div className="w-full flex justify-end">
              <Skeleton
                sx={{ bgcolor: "grey.900" }}
                animation="pulse"
                width={80}
                height={15}
              />
            </div>
            <div className="w-full flex justify-evenly items-center">
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
              <Skeleton
                variant="circular"
                sx={{ bgcolor: "grey.900" }}
                animation="pulse"
                width={25}
                height={25}
              />
            </div>
          </Stack>
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
