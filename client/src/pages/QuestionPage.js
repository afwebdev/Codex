import React, { Component } from "react";
import withStyles from "@material-ui/styles/withStyles";
import { withRouter, Link } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import SimpleLineChart from "../components/SimpleLineChart";
import Months from "../components/common/Months";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import Loading from "../components/common/Loading";
import Topbar from "../components/Topbar";

const backgroundShape = require("../images/shape.svg");
