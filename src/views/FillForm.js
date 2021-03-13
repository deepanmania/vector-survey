import React, { useEffect } from "react";
// @material-ui/core components
import "date-fns";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import Icon from "@material-ui/core/Icon";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
// import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Header from "views/Header";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import DateFnsUtils from "@date-io/date-fns";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import Snackbar from "components/Snackbar/Snackbar.js";
import AddAlert from "@material-ui/icons/AddAlert";
// tabs
import PropTypes from "prop-types";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Webcam from "react-webcam";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import { usePosition } from "use-position";

import { Http } from "lib";
import { container } from "assets/jss/material-dashboard-react";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "environment",
};

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
  formControl: {
    width: "100%",
    "margin-top": "27px",
  },
  padContainer: {
    padding: "0 10%",
  },
};

const waterSampleParams = [
  { name: "Infiltration Gallery", val: "infiltrationgallery" },
  { name: "Infiltration Well", val: "infiltrationwell" },
  { name: "Open Well", val: "openwell" },
  { name: "Bore Well", val: "borewell" },
  { name: "Collection Sump", val: "collectionsump" },
  { name: "Pumping Station", val: "pumpingstation" },
  { name: "Over Head Tank / HDPE Tanks", val: "overheadtank" },
  { name: "RO Plant", val: "roplant" },
  { name: "Distribution Pipeline Tap First", val: "tapfirst" },
  { name: "Distribution Pipeline Tap Middle", val: "tapmiddle" },
  { name: "Distribution Pipeline Tap Last", val: "taplast" },
];

const useStyles = makeStyles(styles);

const responseMap = {
  countries: "states",
  states: "districts",
  districts: "hud",
  hud: "block",
  block: "village",
  village: "habitation",
  habitation: "street",
};

export default function FillForm(props) {
  const stateProps = ((props || {}).location || {}).state || {};
  const [loaded, setLoaded] = React.useState(false);
  const [countries, setCountries] = React.useState([]);
  const [districts, setDistricts] = React.useState([]);
  const [huds, setHuds] = React.useState([]);
  const [blocks, setBlocks] = React.useState([]);
  const [villages, setVillages] = React.useState([]);
  const [habitations, setHabitations] = React.useState([]);
  const [streets, setStreets] = React.useState([]);

  const formValue = Object.assign({}, (stateProps || {}).entry || {});
  useEffect(() => {
    (async () => {
      if (stateProps.id) {
        await Http.getResponse("districts", 36).then((res) => {
          setDistricts(res);
        });
        await Http.getResponse("hud", formValue.district).then((res) => {
          setHuds(res);
        });
        await Http.getResponse("block", formValue.hud).then((res) => {
          setBlocks(res);
        });
        await Http.getResponse("village", formValue.block).then((res) => {
          setVillages(res);
        });
        await Http.getResponse("habitation", formValue.village).then((res) => {
          setHabitations(res);
        });
        await Http.getResponse("street", formValue.habitation).then((res) => {
          setLoaded(true);
          setStreets(res);
        });
      } else {
        Http.getResponse("districts", 36).then((res) => {
          setDistricts(res);
        });
      }
    })();
  }, []);
  const [district, setDistrict] = React.useState(formValue.district || 0);
  const [hud, setHud] = React.useState(formValue.hud || 0);

  const [block, setBlock] = React.useState(formValue.block || 0);

  const [village, setVillage] = React.useState(formValue.village || 0);

  const [habitation, setHabitation] = React.useState(formValue.habitation || 0);

  const [street, setStreet] = React.useState(formValue.street || 0);
  const classes = useStyles();
  // const [states, setStates] = React.useState("");
  // const [state, setState] = React.useState("");
  // const [districts, setDistricts] = React.useState("");
  // const [district, setDistrict] = React.useState("");
  // const [country, setCountry] = React.useState("");
  const [placeType, setPlaceType] = React.useState("");
  const [positiveHouses, setPositiveHouses] = React.useState(
    formValue.positiveHouses || 0
  );
  const [samplesTaken, setSamplesTaken] = React.useState(
    formValue.samplesTaken || 0
  );
  const [houseIndex, setHouseIndex] = React.useState(formValue.houseIndex || 0);
  const [containers, setContainers] = React.useState(formValue.containers || 0);
  const [containerIndex, setContainerIndex] = React.useState(
    formValue.containerIndex || 0
  );
  const [positiveContainers, setPositiveContainers] = React.useState(
    formValue.positiveContainers || 0
  );
  const [breteauIndex, setBreteauIndex] = React.useState(
    formValue.breteauIndex || 0
  );
  const [visitType, setVisitType] = React.useState(formValue.visitType || "");
  const [visitReason, setVisitReason] = React.useState(
    formValue.visitReason || ""
  );
  const setWaterParamState = (varName, event) => {
    const targetVal = (event.target || {}).value;
    const obj = eval(varName);
    obj.name = targetVal;
    eval("set" + varName)(Object.assign({}, obj));
  };
  const removePic = (param, idx) => {
    const photos = eval(param).photos;
    delete photos[idx];
    const val = eval(param);
    val.photos = photos.filter((i) => !!i);
    eval(`set${param}`)(Object.assign({}, val));
  };
  const [infiltrationgallery, setinfiltrationgallery] = React.useState(
    formValue.infiltrationgallery || { name: "", photos: [] }
  );
  const [infiltrationwell, setinfiltrationwell] = React.useState(
    formValue.infiltrationwell || { name: "", photos: [] }
  );
  const [openwell, setopenwell] = React.useState(
    formValue.openwell || { name: "", photos: [] }
  );
  const [borewell, setborewell] = React.useState(
    formValue.borewell || { name: "", photos: [] }
  );
  const [collectionsump, setcollectionsump] = React.useState(
    formValue.collectionsump || { name: "", photos: [] }
  );
  const [pumpingstation, setpumpingstation] = React.useState(
    formValue.pumpingstation || { name: "", photos: [] }
  );
  const [overheadtank, setoverheadtank] = React.useState(
    formValue.overheadtank || { name: "", photos: [] }
  );
  const [roplant, setroplant] = React.useState(
    formValue.roplant || { name: "", photos: [] }
  );
  const [tapfirst, settapfirst] = React.useState(
    formValue.tapfirst || { name: "", photos: [] }
  );
  const [tapmiddle, settapmiddle] = React.useState(
    formValue.tapmiddle || { name: "", photos: [] }
  );
  const [taplast, settaplast] = React.useState(
    formValue.taplast || { name: "", photos: [] }
  );
  const [messageInfo, setmessageInfo] = React.useState("");
  const [showInfo, setshowInfo] = React.useState(false);
  const [webcamEnabled, setWebcamEnabled] = React.useState(false);
  const [dateOfInspection, setDateOfInspection] = React.useState(new Date());
  const [numberOfHouses, setNumberOfHouses] = React.useState(
    formValue.numberOfHouses || 0
  );
  const { latitude, longitude } = usePosition(true);
  const webcamRef = React.useRef(null);
  const handleSubmit = async (op = "insert", id) => {
    const wait = (timeout = 2000) => {
      return new Promise((resolve) => setTimeout(() => resolve, timeout));
    };
    if (!district || !hud) {
      setmessageInfo("District, Hud are required to save the entry");
      setshowInfo(true);
      await wait();
      setshowInfo(false);
    }
    if (
      !infiltrationgallery.name &&
      !infiltrationwell.name &&
      !openwell.name &&
      !borewell.name &&
      !collectionsump.name &&
      !pumpingstation.name &&
      !overheadtank.name &&
      !roplant.name &&
      !tapfirst.name &&
      !tapmiddle.name &&
      !taplast.name
    ) {
      setmessageInfo(
        "Please make atleast one entry in Status of Water Chlorination to save the entry."
      );
      setshowInfo(true);
      await wait();
      setshowInfo(false);
    }
    const payload = {
      formType: "survey",
      userId: localStorage.getItem("userId"),
      body: {
        district,
        hud,
        block,
        village,
        habitation,
        placeType,
        dateOfInspection,
        positiveHouses,
        houseIndex,
        containers,
        containerIndex,
        breteauIndex,
        numberOfHouses,
        infiltrationgallery,
        infiltrationwell,
        openwell,
        borewell,
        collectionsump,
        pumpingstation,
        overheadtank,
        roplant,
        tapfirst,
        tapmiddle,
        taplast,
        street,
        visitType,
        visitReason,
        samplesTaken,
        positiveContainers,
      },
    };
    setmessageInfo("Saving");
    setshowInfo(true);
    await Http.submitVectorFormData(payload, op, id).then(async () => {
      setshowInfo(false);
      props.history.push({
        pathname: "lineList",
      });
    });
  };

  const [paramVal, setParamVal] = React.useState();
  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot({
      width: 1920,
      height: 1080,
    });
    const obj = eval(paramVal);
    obj.photos.push(imageSrc);
    eval(`set${paramVal}`)(Object.assign({}, obj));
    setWebcamEnabled(false);
  }, [webcamRef, paramVal]);
  const closeModal = () => {
    setWebcamEnabled(false);
  };
  const enableCamera = (val) => {
    setParamVal(val);
    setWebcamEnabled(true);
  };

  const handleDateChange = (date) => {
    setDateOfInspection(date);
  };

  const handleChange = (fn, event) => {
    console.log(fn, event);
    const targetVal = (event.target || {}).value;
    if (
      [
        "countries",
        "states",
        "districts",
        "hud",
        "block",
        "village",
        "habitation",
        "street",
      ].includes(fn)
    ) {
      console.log("!!!", fn, event);
      Http.getResponse(responseMap[fn], event.target.value).then((res) => {
        // if (fn === "countries") {
        //   setCountry(targetVal);
        //   setStates(res);
        // }
        // if (fn === "states") {
        //   setState(targetVal);
        //   setDistricts(res);
        // }
        if (fn === "districts") {
          setDistrict(targetVal);
          setHuds(res);
        }
        if (fn === "hud") {
          setHud(targetVal);
          setBlocks(res);
        }
        if (fn === "block") {
          setBlock(targetVal);
          setVillages(res);
        }
        if (fn === "village") {
          setVillage(targetVal);
          setHabitations(res);
        }
        if (fn === "habitation") {
          setHabitation(targetVal);
          setStreets(res);
        }
        if (fn === "street") {
          setStreet(targetVal);
        }
      });
    }
    if (fn === "placetype") {
      setPlaceType(targetVal);
    }
    if (fn === "visitType") {
      setVisitType(targetVal);
    }
    if (fn === "visitReason") {
      setVisitReason(targetVal);
    }
    if (fn === "numberofhouses") {
      setNumberOfHouses(targetVal);
      if (Number(targetVal) !== 0) {
        setHouseIndex((Number(positiveHouses) / Number(targetVal)) * 100);
      }
    }
    if (fn === "positivehouses") {
      setPositiveHouses(targetVal);
      if (Number(targetVal) !== 0) {
        setHouseIndex((Number(targetVal) / Number(numberOfHouses)) * 100);
      }
    }
    if (fn === "houseindex") {
      setHouseIndex(targetVal);
    }
    if (fn === "containers") {
      setContainers(targetVal);
      if (Number(targetVal) !== 0) {
        setContainerIndex(
          (Number(positiveContainers) / Number(targetVal)) * 100
        );
      }
    }
    if (fn === "positiveContainers") {
      setPositiveContainers(targetVal);
      if (Number(targetVal) !== 0) {
        setContainerIndex((Number(targetVal) / Number(containers)) * 100);
      }
    }
    if (fn === "containerindex") {
      setContainerIndex(targetVal);
    }
    if (fn === "breteauindex") {
      setBreteauIndex(targetVal);
    }
  };

  return (stateProps.id ? (
    loaded
  ) : (
    districts.length
  )) ? (
    <div>
      <MuiThemeProvider>
        <Header title="Vector Survey" />
      </MuiThemeProvider>
      <Modal show={webcamEnabled} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Take Photo</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div>
            <Webcam
              style={{ width: "100%" }}
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              mirrored={true}
              videoConstraints={videoConstraints}
              // value={image}
            />
            <button
              onClick={capture}
              // style={{
              //   marginLeft: "-9%"
              // }}
            >
              Capture photo
            </button>
          </div>
        </Modal.Body>
      </Modal>

      <GridContainer container={true}>
        <GridItem xs={12} sm={12} md={12} className={classes.padContainer}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>
                Geographic details of Vector Index
              </h4>
              {/* <p className={classes.cardCategoryWhite}>Complete your profile</p> */}
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-helper-label">
                      District
                    </InputLabel>
                    <Select
                      // labelId="demo-simple-select-helper-label"
                      id="district"
                      value={district}
                      onChange={handleChange.bind(null, "districts")}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {(districts || []).map((i, idx) => (
                        <MenuItem value={i.districtId} key={idx}>
                          {i.districtName}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>Name of the district</FormHelperText>
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-helper-label">
                      HUD
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="hud"
                      value={hud}
                      onChange={handleChange.bind(null, "hud")}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {(huds || []).map((i, idx) => (
                        <MenuItem value={i.hudId} key={idx}>
                          {i.hudName}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>Select HUD</FormHelperText>
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-helper-label">
                      Block
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="block"
                      value={block}
                      onChange={handleChange.bind(null, "block")}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {(blocks || []).map((i, idx) => (
                        <MenuItem value={i.blockId} key={idx}>
                          {i.blockName}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>Select Block</FormHelperText>
                  </FormControl>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-helper-label">
                      Village
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="village"
                      value={village}
                      onChange={handleChange.bind(null, "village")}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {(villages || []).map((i, idx) => (
                        <MenuItem value={i.villageId} key={idx}>
                          {i.villageName}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>
                      Name of the Village / Locality
                    </FormHelperText>
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-helper-label">
                      Habitations
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="habitation"
                      value={habitation}
                      onChange={handleChange.bind(null, "habitation")}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {(habitations || []).map((i, idx) => (
                        <MenuItem value={i.habitationId} key={idx}>
                          {i.habitationName}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>Name of the Habitation</FormHelperText>
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-helper-label">
                      Street
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="street"
                      value={street}
                      onChange={handleChange.bind(null, "street")}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {(streets || []).map((i, idx) => (
                        <MenuItem value={i.streetId} key={idx}>
                          {i.streetName}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>Name of the Hamlet / Street</FormHelperText>
                  </FormControl>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-helper-label">
                      Place Type
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="placetype"
                      value={placeType}
                      onChange={handleChange.bind(null, "placetype")}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {[
                        "House",
                        "Institutions",
                        "Govt Building",
                        "Open Place",
                        "Others",
                      ].map((i, idx) => (
                        <MenuItem value={i} key={idx}>
                          {i}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>Type of the place</FormHelperText>
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      className={classes.formControl}
                      margin="normal"
                      id="date-picker-dialog"
                      label="Date of Sample Taken"
                      format="MM/dd/yyyy"
                      value={dateOfInspection}
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText={`Latitude ${latitude} | Longitude ${longitude}`}
                    id="company-disabled"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      disabled: true,
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-helper-label">
                      Type of Visit
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      value={visitType}
                      onChange={handleChange.bind(null, "visitType")}
                    >
                      a
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {["First", "Follow Up"].map((i, idx) => (
                        <MenuItem value={i} key={idx}>
                          {i}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-helper-label">
                      Reason for Visit
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      value={visitReason}
                      onChange={handleChange.bind(null, "visitReason")}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {["Fever", "Dengue", "Mosquito Audit"].map((i, idx) => (
                        <MenuItem value={i} key={idx}>
                          {i}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={12} className={classes.padContainer}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>
                Status of water chlorination
              </h4>
              {/* <p className={classes.cardCategoryWhite}>Complete your profile</p> */}
            </CardHeader>
            <CardBody>
              <GridContainer
                style={{
                  padding: "0 5%",
                }}
              >
                {waterSampleParams.map((param, idx) => (
                  <GridItem xs={12} sm={12} md={12} key={idx}>
                    <ExpansionPanel>
                      <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography className={classes.heading}>
                          {param.name}
                        </Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <Typography style={{ width: "100%" }}>
                          <GridContainer>
                            <GridItem xs={12} sm={12} md={4}>
                              <CustomInput
                                labelText="name"
                                id={`${param.val}.name`}
                                formControlProps={{
                                  fullWidth: true,
                                }}
                                inputProps={{
                                  value: eval(param.val).name,
                                  onChange: setWaterParamState.bind(
                                    null,
                                    `${param.val}`
                                  ),
                                }}
                              />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}>
                              <CustomInput
                                labelText={`Latitude ${latitude} | Longitude ${longitude}`}
                                id="company-disabled"
                                formControlProps={{
                                  fullWidth: true,
                                }}
                                inputProps={{
                                  disabled: true,
                                }}
                              />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}>
                              <GridContainer>
                                {eval(param.val)
                                  .photos.map((pic, idx) => {
                                    return (
                                      <GridItem
                                        key={idx}
                                        xs={12}
                                        sm={12}
                                        md={3}
                                      >
                                        <div
                                          style={{
                                            position: "relative",
                                          }}
                                        >
                                          <button
                                            onClick={removePic.bind(
                                              null,
                                              param.val,
                                              idx
                                            )}
                                            className="close"
                                            style={{
                                              right: "0px",
                                              position: "absolute",
                                            }}
                                          >
                                            <span>×</span>
                                          </button>
                                          <img
                                            src={pic}
                                            style={{ cursor: "pointer" }}
                                            width="100px"
                                            height="80px"
                                          />
                                        </div>
                                      </GridItem>
                                    );
                                  })
                                  .concat([
                                    <GridItem
                                      xs={12}
                                      sm={12}
                                      md={3}
                                      key={eval(param.val).photos.length}
                                    >
                                      <Icon
                                        fontSize="large"
                                        onClick={enableCamera.bind(
                                          null,
                                          param.val
                                        )}
                                        style={{
                                          position: "relative",
                                          "margin-left": "30%",
                                          "margin-top": "35%",
                                          cursor: "pointer",
                                        }}
                                      >
                                        add_a_photo
                                      </Icon>
                                    </GridItem>,
                                  ])}
                              </GridContainer>
                            </GridItem>
                          </GridContainer>
                        </Typography>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  </GridItem>
                ))}
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Number of Samples Taken"
                    id="samplestaken"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "number",
                      value: samplesTaken,
                      onChange: setWaterParamState.bind(null, "SamplesTaken"),
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={12} md={12} className={classes.padContainer}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Inspection Details</h4>
              {/* <p className={classes.cardCategoryWhite}>Complete your profile</p> */}
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Number of Houses"
                    id="houses"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "number",
                      value: numberOfHouses,
                      onChange: handleChange.bind(null, "numberofhouses"),
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Number of Houses with breeding positive"
                    id="positivehouses"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "number",
                      value: positiveHouses,
                      onChange: handleChange.bind(null, "positivehouses"),
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Computed Indices - House Index"
                    id="houseindex"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "number",
                      value: houseIndex,
                      onChange: handleChange.bind(null, "houseindex"),
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Number of Container Inspected"
                    id="containers"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "number",
                      value: containers,
                      onChange: handleChange.bind(null, "containers"),
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Number of Container with Breeding positive"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "number",
                      value: positiveContainers,
                      onChange: handleChange.bind(null, "positiveContainers"),
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Computed Indices - Container Index"
                    id="containerindex"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "number",
                      value: containerIndex,
                      onChange: handleChange.bind(null, "containerindex"),
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Computed Indices - Breteau Index"
                    id="breteauindex"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "number",
                      value: breteauIndex,
                      onChange: handleChange.bind(null, "breteauindex"),
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
        <CardFooter
          style={{
            width: "100%",
          }}
        >
          <Button
            color="primary"
            style={{
              marginLeft: "50%",
            }}
            onClick={handleSubmit.bind(
              null,
              stateProps.id ? "update" : "create",
              stateProps.id
            )}
          >
            Save Entry
          </Button>
        </CardFooter>
      </GridContainer>
      <Snackbar
        place="tr"
        color="success"
        icon={AddAlert}
        message={messageInfo}
        open={showInfo}
        closeNotification={() => setshowInfo(false)}
        close
      />
    </div>
  ) : (
    <div>Loading...</div>
  );
}
