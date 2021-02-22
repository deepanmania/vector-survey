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
import Snackbar from "components/Snackbar/Snackbar.js";
import AddAlert from "@material-ui/icons/AddAlert";
import Checkbox from '@material-ui/core/Checkbox';
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
  country: "state",
  state: "district",
  district: "hud",
  hud: "block",
  block: "village",
  village: "habitation",
  habitation: "street"
};

export default function FillForm(props) {
  const stateProps = ((props || {}).location || {}).state || {};
  const [loaded, setLoaded] = React.useState(false);
  const [countries, setCountries] = React.useState([]);
  const [districts, setdistricts] = React.useState([]);
  const [huds, setHuds] = React.useState([]);
  const [blocks, setBlocks] = React.useState([]);
  const [villages, setVillages] = React.useState([]);
  const [habitations, setHabitations] = React.useState([]);
  const [streets, setStreets] = React.useState([]);
  const [messageInfo, setmessageInfo] = React.useState("");
  const [showInfo, setshowInfo] = React.useState(false);
  const [infocolor, setinfocolor] = React.useState("success");
  const formValue = Object.assign({}, stateProps);
  formValue.entry = formValue.entry || {};
  formValue.labentry = formValue.labentry || {};
  useEffect(() => {
    (async () => {
      console.log(stateProps);
      if (stateProps.id) {
        await Http.getResponse("districts", 33).then(res => {
          setdistricts(res);
        });
        await Http.getResponse("hud", formValue.entry.district).then(res => {
          setHuds(res);
        });
        await Http.getResponse("block", formValue.entry.hud).then(res => {
          setBlocks(res);
        });
        await Http.getResponse("village", formValue.entry.block).then(res => {
          setVillages(res);
        });
        await Http.getResponse("habitation", formValue.entry.village).then(
          res => {
            setHabitations(res);
          }
        );
        await Http.getResponse("street", formValue.entry.habitation).then(
          res => {
            setLoaded(true);
            setStreets(res);
          }
        );
      } else {
        Http.getResponse("districts", 33).then(res => {
          setdistricts(res);
        });
      }
    })();
  }, []);
  const [district, setdistrict] = React.useState(formValue.entry.district || 0);
  const [hud, setHud] = React.useState(formValue.entry.hud || 0);

  const [block, setBlock] = React.useState(formValue.entry.block || 0);

  const [village, setVillage] = React.useState(formValue.entry.village || 0);

  const [habitation, setHabitation] = React.useState(
    formValue.entry.habitation || 0
  );

  const [street, setStreet] = React.useState(formValue.entry.street || 0);

  const [infiltrationgallery, setinfiltrationgallery] = React.useState(
    formValue.entry.infiltrationgallery || ""
  );
  const [infiltrationwell, setinfiltrationwell] = React.useState(
    formValue.entry.infiltrationwell || ""
  );
  const [openwell, setopenwell] = React.useState(
    formValue.entry.openwell || ""
  );
  const [borewell, setborewell] = React.useState(
    formValue.entry.borewell || ""
  );
  const [collectionsump, setcollectionsump] = React.useState(
    formValue.entry.collectionsump || ""
  );
  const [pumpingstation, setpumpingstation] = React.useState(
    formValue.entry.pumpingstation || ""
  );
  const [overheadtank, setoverheadtank] = React.useState(
    formValue.entry.overheadtank || ""
  );
  const [roplant, setroplant] = React.useState(formValue.entry.roplant || "");
  const [tapfirst, settapfirst] = React.useState(
    formValue.entry.tapfirst || ""
  );
  const [tapmiddle, settapmiddle] = React.useState(
    formValue.entry.tapmiddle || ""
  );
  const [taplast, settaplast] = React.useState(formValue.entry.taplast || "");

  const [sampleReceivedDate, setSampleReceivedDate] = React.useState(
    formValue.labentry.sampleReceivedDate || new Date()
  );

  const [sampleTestedDate, setSampleTestedDate] = React.useState(
    formValue.labentry.sampleTestedDate || new Date()
  );

  const [testType, setTestType] = React.useState(
    formValue.labentry.testType || ""
  );
  const [reportingDate, setReportingDate] = React.useState(
    formValue.labentry.reportingDate || new Date()
  );
  const [color, setColor] = React.useState(formValue.labentry.color || "");
  const [turbidity, setTurbidity] = React.useState(
    formValue.labentry.turbidity || 0
  );
  const [odour, setOdour] = React.useState(formValue.labentry.odour || "");
  const [totalDissolvedSolids, setTotalDissolvedSolids] = React.useState(
    formValue.labentry.totalDissolvedSolids || 0
  );
  const [hardness, setHardness] = React.useState(
    formValue.labentry.hardness || ""
  );
  const [carbonateHardness, setCarbonateHardness] = React.useState(
    formValue.labentry.carbonateHardness || 0
  );
  const [nonCarbonateHardness, setNonCarbonateHardness] = React.useState(
    formValue.labentry.nonCarbonateHardness || 0
  );
  const [totalHardness, setTotalHardness] = React.useState(
    formValue.labentry.totalHardness || 0
  );
  const [chlorideAsChlorine, setChlorideAsChlorine] = React.useState(
    formValue.labentry.chlorideAsChlorine || 0
  );
  const [ammonicalNitrogen, setAmmonicalNitrogen] = React.useState(
    formValue.labentry.ammonicalNitrogen || ""
  );
  const [oxygenAbsorption, setOxygenAbsorption] = React.useState(
    formValue.labentry.oxygenAbsorption || 0
  );
  const [nitrate, setNitrate] = React.useState(formValue.labentry.nitrate || 0);
  const [phenophthalein, setPhenophthalein] = React.useState(
    formValue.labentry.phenophthalein || 0
  );
  const [methylOrange, setMethylOrange] = React.useState(
    formValue.labentry.methylOrange || 0
  );
  const [fluoride, setFluoride] = React.useState(
    formValue.labentry.fluoride || 0
  );
  const [ph, setPh] = React.useState(formValue.labentry.ph || 0);
  const [totalIron, setTotalIron] = React.useState(
    formValue.labentry.totalIron || 0
  );
  const [nitrite, setNitrite] = React.useState(
    formValue.labentry.nitrite || ""
  );
  const [sulphate, setSulphate] = React.useState(
    formValue.labentry.sulphate || ""
  );
  const [phosphate, setPhosPhate] = React.useState(
    formValue.labentry.phosphate || ""
  );
  const [electricalConductivity, setElectricalConductivity] = React.useState(
    formValue.labentry.electricalConductivity || 0
  );
  const [totalColonyCount, setTotalColonyCount] = React.useState(
    formValue.labentry.totalColonyCount || 0
  );
  const [mpn, setMpn] = React.useState(formValue.labentry.mpn || 0);
  // const [rapidEcoliTests, setRapidEcoliTests] = React.useState(
  //   formValue.labentry.rapidEcoliTests || ""
  // );
  const [brilliantGreenTest, setBrilliantGreenTest] = React.useState(
    formValue.labentry.brilliantGreenTest || ""
  );
  const [indoleTest, setIndoleTest] = React.useState(
    formValue.labentry.indoleTest || ""
  );
  const [citrate, setCitrate] = React.useState(
    formValue.labentry.citrate || ""
  );
  const [triptone, setTriptone] = React.useState(
    formValue.labentry.triptone || ""
  );
  const [
    glucosePhosphateMethylRed,
    setGlucosePhosphateMethylRed
  ] = React.useState(formValue.labentry.glucosePhosphateMethylRed || "");
  const [singleBroth, setSingleBroth] = React.useState(
    formValue.labentry.singleBroth || ""
  );
  const [vibrioCholerae, setVibrioCholerae] = React.useState(
    formValue.labentry.singleBroth || ""
  );
  const [fecalStreptococci, setFecalStreptococci] = React.useState(
    formValue.labentry.fecalStreptococci || ""
  );
  const [
    clostridiumPerfereingenes,
    setClostridiumPerfereingenes
  ] = React.useState(formValue.labentry.clostridiumPerfereingenes || "");
  const [salmonellaAndShigella, setSalmonellaAndShigella] = React.useState(
    formValue.labentry.salmonellaAndShigella || ""
  );
  const [pseudomonas, setPseudomonas] = React.useState(
    formValue.labentry.pseudomonas || ""
  );
  const [staphylococcus, setStaphylococcus] = React.useState(
    formValue.labentry.staphylococcus || ""
  );
  const [yeastAndMould, setYeastAndMould] = React.useState(
    formValue.labentry.yeastAndMould || ""
  );
  const [lipolyticBacterialCount, setLipolyticBacterialCount] = React.useState(
    formValue.labentry.lipolyticBacterialCount || ""
  );
  const [
    proteolyticBacterialCount,
    setProteolyticBacterialCount
  ] = React.useState(formValue.labentry.proteolyticBacterialCount || "");
  const [
    thermophilicBacterialCount,
    setThermophilicBacterialCount
  ] = React.useState(formValue.labentry.thermophilicBacterialCount || "");
  const [microscopicalExam, setMicroscopicalExam] = React.useState(
    formValue.labentry.microscopicalExam || ""
  );
  const classes = useStyles();
  // const [states, setStates] = React.useState("");
  // const [state, setState] = React.useState("");
  // const [districts, setdistricts] = React.useState("");
  // const [district, setdistrict] = React.useState("");
  // const [country, setCountry] = React.useState("");
  const [placeType, setPlaceType] = React.useState(
    formValue.entry.placeType || ""
  );
    const setCheckbox = (fn) => {
      eval("set" + fn)(!eval(fn))
    }
  const [samplesTaken, setSamplesTaken] = React.useState(
    formValue.entry.samplesTaken || 0
  );
  const [dateOfInspection, setDateOfInspection] = React.useState(
    formValue.entry.dateOfInspection || new Date()
  );
  const [nameOfPlace, setNameOfPlace] = React.useState(
    formValue.entry.nameOfPlace || ""
  );
  const { latitude, longitude } = usePosition(true);
  const handleSubmit = async (op = "insert", id) => {
    const wait = (timeout = 2000) => {
      return new Promise(resolve => setTimeout(() => resolve, timeout));
    };
    if (!district || !nameOfPlace) {
      setmessageInfo(
        "District and Name of the place are required to save the entry"
      );
      setinfocolor("danger");
      setshowInfo(true);
      await wait();
      setshowInfo(false);
      setinfocolor("info");
    }
    const payload = {
      userId: localStorage.getItem("userId"),
      body: {
        district,
        hud,
        block,
        village,
        habitation,
        placeType,
        street,
        dateOfInspection,
        nameOfPlace,
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
        samplesTaken
      }
    };
    setmessageInfo("Saving");
    setshowInfo(true);
    await Http.submitWaterFormData(payload, op, id)
      .then(() => {
        if (localStorage.getItem("appName") === "water-lab") {
          const labPayload = {
            userId: localStorage.getItem("userId"),
            body: {
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
            }
          };
          return Http.submitWaterLabFormData(labPayload, id, op);
        }
      })
      .then(() => {
        setshowInfo(false);
        props.history.push({
          pathname: "lineList"
        });
      });
  };

  const handleDateChange = date => {
    setDateOfInspection(date);
  };

  const status = ["positive", "negative", "not done"];

  const [labanalysis, setlabanalysis] = React.useState(true)
  const [physicalexam, setphysicalexam] = React.useState(true)
  const [chemicalexam, setchemicalexam] = React.useState(true)
  const [bactexam, setbackexam] = React.useState(true)
  const [bioexam, setbioexam] = React.useState(true)

  const setWaterParamState = (varName, event) => {
    let count = 0;
    waterSampleParams.forEach(param => {
      if (eval(param.val)) {
        count++;
      }
      setSamplesTaken(count);
    });
    const targetVal = (event.target || {}).value;
    eval("set" + varName)(targetVal);
    setHardness(Number(carbonateHardness) + Number(nonCarbonateHardness));
  };

  const handleChange = (fn, event) => {
    console.log(fn, event);
    const targetVal = (event.target || {}).value;
    if (
      [
        "country",
        "state",
        "district",
        "hud",
        "block",
        "village",
        "habitation",
        "street"
      ].includes(fn)
    ) {
      Http.getResponse(responseMap[fn], targetVal).then(res => {
        // if (fn === "countries") {
        //   setCountry(targetVal);
        //   setStates(res);
        // }
        // if (fn === "states") {
        //   setState(targetVal);
        //   setdistricts(res);
        // }
        if (fn === "district") {
          setdistrict(targetVal);
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
        <Header title="Water Entry" />
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
                      onChange={handleChange.bind(null, "district")}
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
                        "Government Institutions",
                        "Private",
                        "Others"
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
                                  value: eval(param.val),
                                  onChange: setWaterParamState.bind(
                                    null,
                                    `${param.val}`
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
                  <h4 className={classes.cardTitleWhite}>Lab Analysis&nbsp;<Checkbox checked={!labanalysis} onChange={setCheckbox.bind(null, "labanalysis")}/></h4>
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
                          disabled={labanalysis}
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
                          disabled={labanalysis}
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
                        disabled={labanalysis}
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
                    Physical Examination&nbsp;<Checkbox checked={!physicalexam} onChange={setCheckbox.bind(null, "physicalexam")}/>
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
                          label="Date of Confirmation"
                          format="MM/dd/yyyy"
                          value={reportingDate}
                          onChange={setWaterParamState.bind(
                            null,
                            "ReportingDate"
                          )}
                          KeyboardButtonProps={{
                            "aria-label": "change date"
                          }}
                          disabled={physicalexam}
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
                          disabled={physicalexam}
                        >
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
                          disabled:physicalexam,
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
                        disabled={physicalexam}
                          labelId="demo-simple-select-helper-label"
                          id="odour"
                          value={odour}
                          onChange={setWaterParamState.bind(null, "Odour")}
                        >
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
                    Chemical Examination&nbsp;<Checkbox checked={!chemicalexam} onChange={setCheckbox.bind(null, "chemicalexam")}/>
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
                          disabled:chemicalexam,
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
                          disabled:chemicalexam,
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
                          disabled:chemicalexam,
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
                          disabled:chemicalexam,
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
                          disabled:chemicalexam,
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
                          disabled:chemicalexam,
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
                          disabled={chemicalexam}
                          onChange={setWaterParamState.bind(
                            null,
                            "AmmonicalNitrogen"
                          )}
                        >
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
                          disabled:chemicalexam,
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
                          disabled:chemicalexam,
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
                          disabled:chemicalexam,
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
                          disabled:chemicalexam,
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
                          disabled:chemicalexam,
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
                          disabled:chemicalexam,
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
                          disabled:chemicalexam,
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
                        disabled={chemicalexam}
                          labelId="demo-simple-select-helper-label"
                          id="Nitrite"
                          value={nitrite}
                          onChange={setWaterParamState.bind(null, "Nitrite")}
                        >
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
                          disabled={chemicalexam}
                          value={sulphate}
                          onChange={setWaterParamState.bind(null, "Sulphate")}
                        >
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
                          disabled={chemicalexam}
                          onChange={setWaterParamState.bind(null, "Phosphate")}
                        >
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
                          disabled:chemicalexam,
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
                    Bacteriological Examination&nbsp;<Checkbox checked={!bactexam} onChange={setCheckbox.bind(null, "bactexam")}/>
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
                          disabled: bactexam,
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
                          disabled: bactexam,
                          type: "number",
                          value: mpn,
                          onChange: setWaterParamState.bind(null, "Mpn")
                        }}
                      />
                    </GridItem>
                  </GridContainer><br />
                  <h6>Rapid Ecoli tests</h6>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={3}>
                      <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-helper-label">
                          Brilliant green test
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-helper-label"
                          value={brilliantGreenTest}
                          disabled={bactexam}
                          onChange={setWaterParamState.bind(
                            null,
                            "BrilliantGreenTest"
                          )}
                        >
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
                          disabled={bactexam}
                          onChange={setWaterParamState.bind(null, "IndoleTest")}
                        >
                          {status.map((i, idx) => (
                            <MenuItem value={i} key={idx}>
                              {i}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </GridItem>
                  </GridContainer><br /><br />
                  <h6>
                    Confirmation test: Sugar tests (E.coli, Citrobacter,
                    klebsiella, Irregular)
                  </h6>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={3}>
                      <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-helper-label">
                          Citrate
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-helper-label"
                          value={citrate}
                          disabled={bactexam}
                          onChange={setWaterParamState.bind(null, "Citrate")}
                        >
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
                          disabled={bactexam}
                          onChange={setWaterParamState.bind(null, "Triptone")}
                        >
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
                          disabled={bactexam}
                          onChange={setWaterParamState.bind(
                            null,
                            "GlucosePhosphateMethylRed"
                          )}
                        >
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
                          disabled={bactexam}
                          onChange={setWaterParamState.bind(
                            null,
                            "SingleBroth"
                          )}
                        >
                          {status.map((i, idx) => (
                            <MenuItem value={i} key={idx}>
                              {i}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </GridItem>
                  </GridContainer><br /><br />
                  <h6>Special tests</h6>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={3}>
                      <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-helper-label">
                          Test for Vibrio cholerae
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-helper-label"
                          value={vibrioCholerae}
                          disabled={bactexam}
                          onChange={setWaterParamState.bind(
                            null,
                            "VibrioCholerae"
                          )}
                        >
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
                          disabled={bactexam}
                          onChange={setWaterParamState.bind(
                            null,
                            "FecalStreptococci"
                          )}
                        >
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
                          disabled={bactexam}
                          onChange={setWaterParamState.bind(
                            null,
                            "ClostridiumPerfereingenes"
                          )}
                        >
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
                          disabled={bactexam}
                          onChange={setWaterParamState.bind(
                            null,
                            "SalmonellaAndShigella"
                          )}
                        >
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
                          disabled={bactexam}
                          onChange={setWaterParamState.bind(
                            null,
                            "Pseudomonas"
                          )}
                        >
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
                          disabled={bactexam}
                          onChange={setWaterParamState.bind(
                            null,
                            "Staphylococcus"
                          )}
                        >
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
                          disabled={bactexam}
                          onChange={setWaterParamState.bind(
                            null,
                            "YeastAndMould"
                          )}
                        >
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
                          disabled: bactexam,
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
                          disabled: bactexam,
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
                          disabled: bactexam,
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
                    Biological Examination&nbsp;<Checkbox checked={!bioexam} onChange={setCheckbox.bind(null, "bioexam")}/>
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
                          disabled: bioexam,
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
        <CardFooter style={{marginLeft: "40%"}}>
          <Button
            color="primary"
            onClick={handleSubmit.bind(
              null,
              stateProps.id ? "update" : "create",
              stateProps.id
            )}
          >
            Save Entry
          </Button>&nbsp;&nbsp;&nbsp;
          <Button
            color="primary"
            onClick={handleSubmit.bind(
              null,
              "draft",
              stateProps.id
            )}
          >
            Save Draft
          </Button>
        </CardFooter>
      </GridContainer>
      <Snackbar
        place="tr"
        color={infocolor}
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
