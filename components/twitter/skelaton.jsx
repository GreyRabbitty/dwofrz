import React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

export default function skelaton() {
  return (
    <div>
      <Skeleton
        sx={{ bgcolor: "grey.900" }}
        animation="pulse"
        width={550}
        height={300}
      />
    </div>
  );
}
