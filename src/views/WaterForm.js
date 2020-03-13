import React, { useEffect } from "react";
// @material-ui/core components
import "date-fns";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
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
import Icon from "@material-ui/core/Icon";
// tabs
// import PropTypes from "prop-types";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import { usePosition } from "use-position";

import { Http } from "lib";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  formControl: {
    width: "100%",
    "margin-top": "27px"
  },
  padContainer: {
    padding: "0 10%"
  }
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
  { name: "Distribution Pipeline Tap Last", val: "taplast" }
];

const colourArr = [
  "Colourless",
  "Slightly Whitish",
  "Yellowish",
  "Brownish",
  "Greenish",
  "Slightly Greenish",
  "Others"
];

const odourArr = [
  "Odourless",
  "Slightly Chlorinous (Acceptable)",
  "Highly Chlorinous",
  "Aromatic",
  "Tangic",
  "Bitter",
  "Disagreeable (Non-Acceptable)"
];

const ammonicalNitrogenArr = ["Nil – A", "Trace", "Present", "Marked - NA"];
const nitriteArr = [
  "Nil",
  "Trace",
  "Present",
  "Marked" //(Nil, Trace, Present A, Marked More than NA)
];
const sulphateArr = [
  "Nil",
  "Trace",
  "Present",
  "marked" // (Nil, Trace 0-200, Present 200-400 A, Marked More than 400 NA
];

const phosphateArr = [
  "Nil",
  "Trace",
  "Present",
  "Marked" // ( Nil, Trace A, Present and Marked NA)
];

const useStyles = makeStyles(styles);

const responseMap = {
  countries: "states",
  states: "districts",
  districts: "hud",
  hud: "block",
  block: "village",
  village: "habitation",
  habitation: "street"
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

  const formValue = Object.assign({}, stateProps);
  useEffect(() => {
    (async () => {
      if (stateProps.id) {
        await Http.getResponse("districts", 33).then(res => {
          setDistricts(res);
        });
        await Http.getResponse("hud", formValue.district).then(res => {
          setHuds(res);
        });
        await Http.getResponse("block", formValue.hud).then(res => {
          setBlocks(res);
        });
        await Http.getResponse("village", formValue.block).then(res => {
          setVillages(res);
        });
        await Http.getResponse("habitation", formValue.village).then(res => {
          setHabitations(res);
        });
        await Http.getResponse("street", formValue.habitation).then(res => {
          setLoaded(true);
          setStreets(res);
        });
      } else {
        Http.getResponse("districts", 33).then(res => {
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

  const [infiltrationgalleryName, setinfiltrationgalleryName] = React.useState(
    formValue.infiltrationgalleryName || ""
  );
  const [infiltrationwellName, setinfiltrationwellName] = React.useState(
    formValue.infiltrationwellName || ""
  );
  const [openwellName, setopenwellName] = React.useState(
    formValue.openwellName || ""
  );
  const [borewellName, setborewellName] = React.useState(
    formValue.borewellName || ""
  );
  const [collectionsumpName, setcollectionsumpName] = React.useState(
    formValue.collectionsumpName || ""
  );
  const [pumpingstationName, setpumpingstationName] = React.useState(
    formValue.pumpingstationName || ""
  );
  const [overheadtankName, setoverheadtankName] = React.useState(
    formValue.overheadtankName || ""
  );
  const [roplantName, setroplantName] = React.useState(
    formValue.roplantName || ""
  );
  const [tapfirstName, settapfirstName] = React.useState(
    formValue.tapfirstName || ""
  );
  const [tapmiddleName, settapmiddleName] = React.useState(
    formValue.tapmiddleName || ""
  );
  const [taplastName, settaplastName] = React.useState(
    formValue.taplastName || ""
  );

  const [sampleReceivedDate, setSampleReceivedDate] = React.useState(
    formValue.sampleReceivedDate || new Date()
  );

  const [sampleTestedDate, setSampleTestedDate] = React.useState(
    formValue.sampleTestedDate || new Date()
  );

  const [testType, setTestType] = React.useState(formValue.testType || "");
  const [reportingDate, setReportingDate] = React.useState(
    formValue.reportingDate || new Date()
  );
  const [color, setColor] = React.useState(formValue.color || "");
  const [turbidity, setTurbidity] = React.useState(formValue.turbidity || 0);
  const [odour, setOdour] = React.useState(formValue.odour || "");
  const [totalDissolvedSolids, setTotalDissolvedSolids] = React.useState(
    formValue.totalDissolvedSolids || 0
  );
  const [hardness, setHardness] = React.useState(formValue.hardness || "");
  const [carbonateHardness, setCarbonateHardness] = React.useState(
    formValue.carbonateHardness || 0
  );
  const [nonCarbonateHardness, setNonCarbonateHardness] = React.useState(
    formValue.nonCarbonateHardness || 0
  );
  const [totalHardness, setTotalHardness] = React.useState(
    formValue.totalHardness || 0
  );
  const [chlorideAsChlorine, setChlorideAsChlorine] = React.useState(
    formValue.chlorideAsChlorine || 0
  );
  const [ammonicalNitrogen, setAmmonicalNitrogen] = React.useState(
    formValue.ammonicalNitrogen || ""
  );
  const [oxygenAbsorption, setOxygenAbsorption] = React.useState(
    formValue.oxygenAbsorption || 0
  );
  const [nitrate, setNitrate] = React.useState(formValue.nitrate || 0);
  const [phenophthalein, setPhenophthalein] = React.useState(
    formValue.phenophthalein || 0
  );
  const [methylOrange, setMethylOrange] = React.useState(
    formValue.methylOrange || 0
  );
  const [fluoride, setFluoride] = React.useState(formValue.fluoride || 0);
  const [ph, setPh] = React.useState(formValue.ph || 0);
  const [totalIron, setTotalIron] = React.useState(formValue.totalIron || 0);
  const [nitrite, setNitrite] = React.useState(formValue.nitrite || "");
  const [sulphate, setSulphate] = React.useState(formValue.sulphate || "");
  const [phosphate, setPhosPhate] = React.useState(formValue.phosphate || "");
  const [electricalConductivity, setElectricalConductivity] = React.useState(
    formValue.electricalConductivity || 0
  );
  const [totalColonyCount, setTotalColonyCount] = React.useState(
    formValue.totalColonyCount || 0
  );
  const [mpn, setMpn] = React.useState(formValue.mpn || 0);
  // const [rapidEcoliTests, setRapidEcoliTests] = React.useState(
  //   formValue.rapidEcoliTests || ""
  // );
  const [brilliantGreenTest, setBrilliantGreenTest] = React.useState(
    formValue.brilliantGreenTest || ""
  );
  const [indoleTest, setIndoleTest] = React.useState(
    formValue.indoleTest || ""
  );
  const [citrate, setCitrate] = React.useState(formValue.citrate || "");
  const [triptone, setTriptone] = React.useState(formValue.triptone || "");
  const [
    glucosePhosphateMethylRed,
    setGlucosePhosphateMethylRed
  ] = React.useState(formValue.glucosePhosphateMethylRed || "");
  const [singleBroth, setSingleBroth] = React.useState(
    formValue.singleBroth || ""
  );
  const [vibrioCholerae, setVibrioCholerae] = React.useState(
    formValue.singleBroth || ""
  );
  const [fecalStreptococci, setFecalStreptococci] = React.useState(
    formValue.fecalStreptococci || ""
  );
  const [
    clostridiumPerfereingenes,
    setClostridiumPerfereingenes
  ] = React.useState(formValue.clostridiumPerfereingenes || "");
  const [salmonellaAndShigella, setSalmonellaAndShigella] = React.useState(
    formValue.salmonellaAndShigella || ""
  );
  const [pseudomonas, setPseudomonas] = React.useState(
    formValue.pseudomonas || ""
  );
  const [staphylococcus, setStaphylococcus] = React.useState(
    formValue.staphylococcus || ""
  );
  const [yeastAndMould, setYeastAndMould] = React.useState(
    formValue.yeastAndMould || ""
  );
  const [lipolyticBacterialCount, setLipolyticBacterialCount] = React.useState(
    formValue.lipolyticBacterialCount || ""
  );
  const [
    proteolyticBacterialCount,
    setProteolyticBacterialCount
  ] = React.useState(formValue.proteolyticBacterialCount || "");
  const [
    thermophilicBacterialCount,
    setThermophilicBacterialCount
  ] = React.useState(formValue.thermophilicBacterialCount || "");
  const [microscopicalExam, setMicroscopicalExam] = React.useState(
    formValue.microscopicalExam || ""
  );
  const classes = useStyles();
  // const [states, setStates] = React.useState("");
  // const [state, setState] = React.useState("");
  // const [districts, setDistricts] = React.useState("");
  // const [district, setDistrict] = React.useState("");
  // const [country, setCountry] = React.useState("");
  const [placeType, setPlaceType] = React.useState("");

  const [samplesTaken, setSamplesTaken] = React.useState(
    formValue.samplesTaken || 0
  );
  const [dateOfInspection, setDateOfInspection] = React.useState(new Date());
  const [nameOfPlace, setNameOfPlace] = React.useState(
    formValue.nameOfPlace || ""
  );
  const { latitude, longitude } = usePosition(true);
  const handleSubmit = async (op = "insert", id) => {
    const payload = {
      district,
      hud,
      block,
      village,
      habitation,
      placeType,
      dateOfInspection,
      nameOfPlace,
      infiltrationgalleryName,
      infiltrationwellName,
      openwellName,
      borewellName,
      collectionsumpName,
      pumpingstationName,
      overheadtankName,
      roplantName,
      tapfirstName,
      tapmiddleName,
      taplastName,
      samplesTaken
    };
    await Http.submitWaterFormData(payload, op, id).then(() => {
      if (localStorage.getItem("appName") === "water-lab") {
        const labPayload = {
          sampleReceivedDate,
          sampleTestedDate,
          testType,
          reportingDate,
          color,
          turbidity,
          odour,
          totalDissolvedSolids,
          hardness,
          carbonateHardness,
          nonCarbonateHardness,
          totalHardness,
          chlorideAsChlorine,
          ammonicalNitrogen,
          oxygenAbsorption,
          nitrate,
          phenophthalein,
          methylOrange,
          fluoride,
          ph,
          totalIron,
          nitrite,
          sulphate,
          phosphate,
          electricalConductivity,
          totalColonyCount,
          mpn,
          brilliantGreenTest,
          indoleTest,
          citrate,
          triptone,
          glucosePhosphateMethylRed,
          singleBroth,
          vibrioCholerae,
          fecalStreptococci,
          clostridiumPerfereingenes,
          salmonellaAndShigella,
          pseudomonas,
          staphylococcus,
          yeastAndMould,
          lipolyticBacterialCount,
          proteolyticBacterialCount,
          thermophilicBacterialCount,
          microscopicalExam
        };
        return Http.submitWaterLabFormData(labPayload, id);
      }
    });
  };

  const handleDateChange = date => {
    setDateOfInspection(date);
  };

  const status = ["positive", "negative"];

  const setWaterParamState = (varName, event) => {
    const targetVal = (event.target || {}).value;
    eval("set" + varName)(targetVal);
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
        "street"
      ].includes(fn)
    ) {
      Http.getResponse(responseMap[fn], event.target.value).then(res => {
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
    if (fn === "nameofplace") {
      setNameOfPlace(targetVal);
    }
  };

  return (stateProps.id ? (
    loaded
  ) : (
    districts.length
  )) ? (
    <div>
      <MuiThemeProvider>
        <Header title="New Entry" />
      </MuiThemeProvider>
      <GridContainer container={true}>
        <GridItem xs={12} sm={12} md={12} className={classes.padContainer}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>
                Geographic details of Water Index
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
                      labelId="demo-simple-select-helper-label"
                      id="district"
                      value={district}
                      onChange={setWaterParamState.bind(null, "districts")}
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
                        "Corporation",
                        "Municipalities",
                        "Town Panchayats",
                        "Government Hospitals",
                        "Government Homes",
                        "Railway Stations",
                        "Prisons",
                        "Government Institutions"
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
                      label="Date of Inspection"
                      format="MM/dd/yyyy"
                      value={dateOfInspection}
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        "aria-label": "change date"
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Name of the Place"
                    id="placename"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "text",
                      value: nameOfPlace,
                      onChange: handleChange.bind(null, "nameofplace")
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
              <h4 className={classes.cardTitleWhite}>Water Sample Details</h4>
              {/* <p className={classes.cardCategoryWhite}>Complete your profile</p> */}
            </CardHeader>
            <CardBody>
              <GridContainer
                style={{
                  padding: "0 5%"
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
                      <ExpansionPanelDetails style={{ width: "100%" }}>
                        <Typography style={{ width: "100%" }}>
                          <GridContainer>
                            <GridItem xs={12} sm={12} md={4}>
                              <CustomInput
                                labelText="name"
                                id={`${param.val}.name`}
                                formControlProps={{
                                  fullWidth: true
                                }}
                                inputProps={{
                                  value: eval(param.val + "Name"),
                                  onChange: setWaterParamState.bind(
                                    null,
                                    `${param.val}Name`
                                  )
                                }}
                              />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}>
                              <CustomInput
                                labelText={`Latitude ${latitude} | Longitude ${longitude}`}
                                id="company-disabled"
                                formControlProps={{
                                  fullWidth: true
                                }}
                                inputProps={{
                                  disabled: true
                                }}
                              />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}>
                              <Icon
                                fontSize="large"
                                style={{
                                  paddingTop: "8%",
                                  paddingLeft: "30%"
                                }}
                              >
                                add_a_photo
                              </Icon>
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
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "number",
                      value: samplesTaken,
                      onChange: setWaterParamState.bind(null, "SamplesTaken")
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
        {localStorage.getItem("appName") === "water-lab" && (
          <div
            style={{
              width: "100%"
            }}
          >
            <GridItem xs={12} sm={12} md={12} className={classes.padContainer}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>Lab Analysis</h4>
                  {/* <p className={classes.cardCategoryWhite}>Complete your profile</p> */}
                </CardHeader>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={4}>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          className={classes.formControl}
                          margin="normal"
                          id="date-picker-dialog"
                          label="Sample Received Date"
                          format="MM/dd/yyyy"
                          value={sampleReceivedDate}
                          onChange={setWaterParamState.bind(
                            null,
                            "SampleReceivedDate"
                          )}
                          KeyboardButtonProps={{
                            "aria-label": "change date"
                          }}
                        />
                      </MuiPickersUtilsProvider>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          className={classes.formControl}
                          margin="normal"
                          id="date-picker-dialog"
                          label="Date of Sample Tested"
                          format="MM/dd/yyyy"
                          value={sampleTestedDate}
                          onChange={setWaterParamState.bind(
                            null,
                            "SampleTestedDate"
                          )}
                          KeyboardButtonProps={{
                            "aria-label": "change date"
                          }}
                        />
                      </MuiPickersUtilsProvider>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <CustomInput
                        labelText="Type Of Test"
                        id="testtype"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "text",
                          value: testType,
                          onChange: setWaterParamState.bind(null, "TestType")
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
                  <h4 className={classes.cardTitleWhite}>
                    Physical Examination
                  </h4>
                  {/* <p className={classes.cardCategoryWhite}>Complete your profile</p> */}
                </CardHeader>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={3}>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          className={classes.formControl}
                          margin="normal"
                          id="date-picker-dialog"
                          label="Date of Reporting"
                          format="MM/dd/yyyy"
                          value={reportingDate}
                          onChange={setWaterParamState.bind(
                            null,
                            "ReportingDate"
                          )}
                          KeyboardButtonProps={{
                            "aria-label": "change date"
                          }}
                        />
                      </MuiPickersUtilsProvider>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                      <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-helper-label">
                          Color
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-helper-label"
                          id="color"
                          value={color}
                          onChange={setWaterParamState.bind(null, "Color")}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {(colourArr || []).map((i, idx) => (
                            <MenuItem value={i} key={idx}>
                              {i}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                      <CustomInput
                        labelText="Turbidity"
                        id="turbidity"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "number",
                          value: turbidity,
                          onChange: setWaterParamState.bind(null, "Turbidity")
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                      <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-helper-label">
                          Odour
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-helper-label"
                          id="odour"
                          value={odour}
                          onChange={setWaterParamState.bind(null, "Odour")}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {(odourArr || []).map((i, idx) => (
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
                    Chemical Examination
                  </h4>
                  {/* <p className={classes.cardCategoryWhite}>Complete your profile</p> */}
                </CardHeader>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={3}>
                      <CustomInput
                        labelText="Total Dissolved solids"
                        id="Total Dissolved solids"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "number",
                          value: totalDissolvedSolids,
                          onChange: setWaterParamState.bind(
                            null,
                            "TotalDissolvedSolids"
                          )
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                      <CustomInput
                        labelText="Hardness"
                        id="Hardness"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "text",
                          value: hardness,
                          onChange: setWaterParamState.bind(null, "Hardness")
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                      <CustomInput
                        labelText="Carbonate hardness"
                        id="Carbonate hardness"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "number",
                          value: carbonateHardness,
                          onChange: setWaterParamState.bind(
                            null,
                            "CarbonateHardness"
                          )
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                      <CustomInput
                        labelText="Non-Carbonate Hardness"
                        id="Non-Carbonate Hardness"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "number",
                          value: nonCarbonateHardness,
                          onChange: setWaterParamState.bind(
                            null,
                            "NonCarbonateHardness"
                          )
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={3}>
                      <CustomInput
                        labelText="Total hardness"
                        id="Total hardness"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "number",
                          value: totalHardness,
                          onChange: setWaterParamState.bind(
                            null,
                            "TotalHardness"
                          )
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                      <CustomInput
                        labelText="Chloride as Chlorine"
                        id="Chloride as Chlorine"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "number",
                          value: chlorideAsChlorine,
                          onChange: setWaterParamState.bind(
                            null,
                            "ChlorideAsChlorine"
                          )
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                      <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-helper-label">
                          Ammonical nitrogen
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-helper-label"
                          id="Ammonical nitrogen"
                          value={ammonicalNitrogen}
                          onChange={setWaterParamState.bind(
                            null,
                            "AmmonicalNitrogen"
                          )}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {(ammonicalNitrogenArr || []).map((i, idx) => (
                            <MenuItem value={i} key={idx}>
                              {i}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                      <CustomInput
                        labelText="Oxygen absorption (Tidy's test)"
                        id="Oxygen absorption (Tidy's test)"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "number",
                          value: oxygenAbsorption,
                          onChange: setWaterParamState.bind(
                            null,
                            "oxygenAbsorption"
                          )
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={3}>
                      <CustomInput
                        labelText="Nitrate"
                        id="Nitrate"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "number",
                          value: nitrate,
                          onChange: setWaterParamState.bind(null, "Nitrate")
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                      <CustomInput
                        labelText="Alkalinity-Phenophthalein (Only one can be Selected)"
                        id="Alkalinity-Phenophthalein (Only one can be Selected)"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "number",
                          value: phenophthalein,
                          onChange: setWaterParamState.bind(
                            null,
                            "Phenophthalein"
                          )
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                      <CustomInput
                        labelText="Alkalinity-Methyl Orange"
                        id="Alkalinity-Methyl Orange"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "number",
                          value: methylOrange,
                          onChange: setWaterParamState.bind(
                            null,
                            "MethylOrange"
                          )
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                      <CustomInput
                        labelText="Fluoride"
                        id="Fluoride"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "number",
                          value: fluoride,
                          onChange: setWaterParamState.bind(null, "Fluoride")
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={3}>
                      <CustomInput
                        labelText="pH"
                        id="pH"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "number",
                          value: ph,
                          onChange: setWaterParamState.bind(null, "Ph")
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                      <CustomInput
                        labelText="Total Iron"
                        id="Total Iron"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "number",
                          value: totalIron,
                          onChange: setWaterParamState.bind(null, "TotalIron")
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                      <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-helper-label">
                          Nitrite
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-helper-label"
                          id="Nitrite"
                          value={nitrite}
                          onChange={setWaterParamState.bind(null, "Nitrite")}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {(nitriteArr || []).map((i, idx) => (
                            <MenuItem value={i} key={idx}>
                              {i}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                      <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-helper-label">
                          Sulphate
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-helper-label"
                          id="Sulphate"
                          value={sulphate}
                          onChange={setWaterParamState.bind(null, "Sulphate")}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {(sulphateArr || []).map((i, idx) => (
                            <MenuItem value={i} key={idx}>
                              {i}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={3}>
                      <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-helper-label">
                          Phosphate
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-helper-label"
                          id="Phosphate"
                          value={phosphate}
                          onChange={setWaterParamState.bind(null, "Phosphate")}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {(phosphateArr || []).map((i, idx) => (
                            <MenuItem value={i} key={idx}>
                              {i}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                      <CustomInput
                        labelText="Electrical conductivity"
                        id="Electrical conductivity"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "number",
                          value: electricalConductivity,
                          onChange: setWaterParamState.bind(
                            null,
                            "ElectricalConductivity"
                          )
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
                  <h4 className={classes.cardTitleWhite}>
                    Bacteriological Examination
                  </h4>
                  {/* <p className={classes.cardCategoryWhite}>Complete your profile</p> */}
                </CardHeader>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={3}>
                      <CustomInput
                        labelText="Total Colony count per ml on agar at 37 deg Centigrade"
                        id="TotalColonyCount"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "number",
                          value: totalColonyCount,
                          onChange: setWaterParamState.bind(
                            null,
                            "TotalColonyCount"
                          )
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                      <CustomInput
                        labelText="MPN Most Probable Number / 100ml"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "number",
                          value: mpn,
                          onChange: setWaterParamState.bind(null, "Mpn")
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                  <h4>Rapid Ecoli tests</h4>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={3}>
                      <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-helper-label">
                          Brilliant green test
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-helper-label"
                          value={brilliantGreenTest}
                          onChange={setWaterParamState.bind(
                            null,
                            "BrilliantGreenTest"
                          )}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {status.map((i, idx) => (
                            <MenuItem value={i} key={idx}>
                              {i}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                      <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-helper-label">
                          Indole test
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-helper-label"
                          value={indoleTest}
                          onChange={setWaterParamState.bind(null, "IndoleTest")}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {status.map((i, idx) => (
                            <MenuItem value={i} key={idx}>
                              {i}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </GridItem>
                  </GridContainer>
                  <h4>
                    Confirmation test: Sugar tests (E.coli, Citrobacter,
                    klebsiella, Irregular)
                  </h4>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={3}>
                      <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-helper-label">
                          Citrate
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-helper-label"
                          value={citrate}
                          onChange={setWaterParamState.bind(null, "Citrate")}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {status.map((i, idx) => (
                            <MenuItem value={i} key={idx}>
                              {i}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                      <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-helper-label">
                          Triptone -Indole
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-helper-label"
                          value={triptone}
                          onChange={setWaterParamState.bind(null, "Triptone")}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {status.map((i, idx) => (
                            <MenuItem value={i} key={idx}>
                              {i}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                      <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-helper-label">
                          Glucose phosphate-Methyl Red
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-helper-label"
                          value={glucosePhosphateMethylRed}
                          onChange={setWaterParamState.bind(
                            null,
                            "GlucosePhosphateMethylRed"
                          )}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {status.map((i, idx) => (
                            <MenuItem value={i} key={idx}>
                              {i}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                      <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-helper-label">
                          Single broth
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-helper-label"
                          value={singleBroth}
                          onChange={setWaterParamState.bind(
                            null,
                            "SingleBroth"
                          )}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {status.map((i, idx) => (
                            <MenuItem value={i} key={idx}>
                              {i}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </GridItem>
                  </GridContainer>
                  <h4>Special tests</h4>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={3}>
                      <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-helper-label">
                          Test for Vibrio cholerae
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-helper-label"
                          value={vibrioCholerae}
                          onChange={setWaterParamState.bind(
                            null,
                            "VibrioCholerae"
                          )}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {status.map((i, idx) => (
                            <MenuItem value={i} key={idx}>
                              {i}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                      <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-helper-label">
                          Test for fecal streptococci
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-helper-label"
                          value={fecalStreptococci}
                          onChange={setWaterParamState.bind(
                            null,
                            "FecalStreptococci"
                          )}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {status.map((i, idx) => (
                            <MenuItem value={i} key={idx}>
                              {i}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                      <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-helper-label">
                          Test for Clostridium perfereingenes
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-helper-label"
                          value={clostridiumPerfereingenes}
                          onChange={setWaterParamState.bind(
                            null,
                            "ClostridiumPerfereingenes"
                          )}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {status.map((i, idx) => (
                            <MenuItem value={i} key={idx}>
                              {i}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                      <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-helper-label">
                          Test for Salmonella & Shigella
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-helper-label"
                          value={salmonellaAndShigella}
                          onChange={setWaterParamState.bind(
                            null,
                            "SalmonellaAndShigella"
                          )}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {status.map((i, idx) => (
                            <MenuItem value={i} key={idx}>
                              {i}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={3}>
                      <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-helper-label">
                          Test for Pseudomonas
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-helper-label"
                          value={pseudomonas}
                          onChange={setWaterParamState.bind(
                            null,
                            "Pseudomonas"
                          )}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {status.map((i, idx) => (
                            <MenuItem value={i} key={idx}>
                              {i}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                      <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-helper-label">
                          Staphylococcus
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-helper-label"
                          value={staphylococcus}
                          onChange={setWaterParamState.bind(
                            null,
                            "Staphylococcus"
                          )}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {status.map((i, idx) => (
                            <MenuItem value={i} key={idx}>
                              {i}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                      <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-helper-label">
                          Yeast & Mould
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-helper-label"
                          value={yeastAndMould}
                          onChange={setWaterParamState.bind(
                            null,
                            "YeastAndMould"
                          )}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {status.map((i, idx) => (
                            <MenuItem value={i} key={idx}>
                              {i}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                      <CustomInput
                        labelText="Lipolytic bacterial count"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "number",
                          value: lipolyticBacterialCount,
                          onChange: setWaterParamState.bind(
                            null,
                            "LipolyticBacterialCount"
                          )
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={3}>
                      <CustomInput
                        labelText="Proteolytic bacterial count"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "number",
                          value: proteolyticBacterialCount,
                          onChange: setWaterParamState.bind(
                            null,
                            "ProteolyticBacterialCount"
                          )
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                      <CustomInput
                        labelText="Thermophilic bacterial count"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "number",
                          value: thermophilicBacterialCount,
                          onChange: setWaterParamState.bind(
                            null,
                            "ThermophilicBacterialCount"
                          )
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
                  <h4 className={classes.cardTitleWhite}>
                    Biological Examination
                  </h4>
                  {/* <p className={classes.cardCategoryWhite}>Complete your profile</p> */}
                </CardHeader>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={3}>
                      <CustomInput
                        labelText="Microscopical Exam"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "text",
                          value: microscopicalExam,
                          onChange: setWaterParamState.bind(
                            null,
                            "MicroscopicalExam"
                          )
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                </CardBody>
              </Card>
            </GridItem>
          </div>
        )}
        <CardFooter>
          <Button
            color="primary"
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
    </div>
  ) : (
    <div>Loading...</div>
  );
}
