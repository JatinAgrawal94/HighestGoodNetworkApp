import { useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import { addTitle } from '../../../actions/title';
import AssignProjectField from './AssignProjectField';
import AssignTeamField from './AssignTeamField';
import AssignTeamCodeField from './AssignTeamCodeField';
import { useSelector } from 'react-redux';
import "../../Header/DarkMode.css"

function AddNewTitleModal({ isOpen, setIsOpen, refreshModalTitles, teamsData, projectsData, setWarningMessage, setShowMessage }) {
  const darkMode = useSelector(state => state.theme.darkMode)

  const [titleData, setTitleData] = useState({
    titleName: '',
    mediaFolder: '',
    teamCode: '',
    projectAssigned: '',
    // teamAssiged: {},
  });

  let existTeamCodes = new Set();
  let existTeamName = new Set();
  if (teamsData?.allTeamCode) {
    const names = teamsData.allTeams.map(team => team.teamName);
    existTeamCodes = new Set(teamsData?.allTeamCode?.distinctTeamCodes);
    existTeamName = new Set(names);
  }
  const [selectedTeam, onSelectTeam] = useState(undefined);
  const [selectedProject, onSelectProject] = useState(undefined);
  const [selectedTeamCode, onSelectTeamCode] = useState(undefined);
  const [isValidProject, onValidation] = useState(false);
  const [searchText, setSearchText] = useState(''); // For addTeamAutoComplete

  const selectProject = project => {
    onSelectProject(project);
    setTitleData(prev => ({
      ...prev,
      projectAssigned: {
        projectName: project.projectName,
        _id: project._id,
        category: project.category,
      },
    }));
    onValidation(true);
  };

  const selectTeamCode = teamCode => {
    onSelectTeamCode(teamCode);
    setTitleData(prev => ({
      ...prev,
      teamCode: teamCode,
    }));
  };  

  const cleanProjectAssign = () => {
    setTitleData(prev => ({
      ...prev,
      projectAssigned: "",
    }));
  };

  const selectTeam = team => {
    onSelectTeam(team);
    setTitleData(prev => ({
      ...prev,
      teamAssiged: {
        teamName: team.teamName,
        _id: team._id,
      },
    }));
    onValidation(true);
  };

  const cleanTeamCodeAssign = () => {
    setTitleData(prev => ({
      ...prev,
      teamCode: "",
    }));
  };

  const cleanTeamAssigned = () => {
    // if clean all input field -> no team selected
    const updatedTitleData = { ...titleData };
    delete updatedTitleData.teamAssiged;
    setTitleData(updatedTitleData);
  };

  const undoTeamAssigned = () => {
    setTitleData(prev => ({
      ...prev,
      teamAssiged: {
        teamName: searchText,
        _id: "N/A",
      },
    }));
  };


  // confirm and save
    const confirmOnClick = () => {
    // debugger;
    const isValidTeamName = onTeamNameValidation(selectedTeam);
    if (!isValidTeamName) {
      return;
    }
    addTitle(titleData)
      .then((resp) => {
        if (resp.status !== 200) {
          setWarningMessage({ title: "Error", content: resp.message });
          setShowMessage(true);
        } else {
          setIsOpen(false);
          refreshModalTitles();
        };
      })
      .catch(e => {
        console.log(e);
      });
  };

  const onTeamCodeValidation = (teamCode) => {
    const format1 = /^[A-Za-z]-[A-Za-z]{3}$/;
    const format2 = /^[A-Z]{5}$/;
    // Check if the input value matches either of the formats
    const isValidFormat = format1.test(teamCode) || format2.test(teamCode);
    if (!isValidFormat) {
      setWarningMessage({ title: "Error", content: "Invalid Team Code Format" });
      setShowMessage(true);
      setTitleData(prev => ({ ...prev, teamCode: '' }));
      return;
    } 
    if(!existTeamCodes.has(teamCode)) {
      setWarningMessage({ title: "Error", content: "Team Code Not Exists" });
      setShowMessage(true);
      setTitleData(prev => ({ ...prev, teamCode: '' }));
      return;
    }
    setShowMessage(false);
  }

  const onTeamNameValidation = (teamName) => {
    if (teamName !== '') {
      // debugger;
      if (!existTeamName.has(teamName.teamName)) {
        setWarningMessage({ title: "Error", content: "Team Name Not Exists" });
        setShowMessage(true);
        return false;
      }
    }
    setShowMessage(false);
    return true;
  }


  const fontColor = darkMode ? 'text-light' : '';


  return (
    <Modal isOpen={isOpen} toggle={() => setIsOpen(false)} className={darkMode ? 'text-light dark-mode' : ''}>
      <ModalHeader toggle={() => setIsOpen(false)} className={darkMode ? "bg-space-cadet" : ""}>Add A New Title</ModalHeader>
      <ModalBody className={darkMode ? 'bg-yinmn-blue' : ''}>
        <Form>
          <FormGroup>
            <Label className={fontColor}>Title Name<span className='qsm-modal-required'>*</span>: </Label>
            <Input
              type="text"
              name="text"
              id="mediafolder"
              onChange={e => {
                e.persist();
                setTitleData(prev => ({ ...prev, titleName: e.target.value }));
              }}
            />

            <Label className={fontColor}>Media Folder<span className='qsm-modal-required'>*</span>: </Label>
            <Input
              type="text"
              name="text"
              id="mediafolder"
              onChange={e => {
                e.persist();
                setTitleData(prev => ({ ...prev, mediaFolder: e.target.value }));
              }}
            />
            <Label className={fontColor}>Team Code<span className='qsm-modal-required'>*</span>:</Label>
            {/* <Input
              type="text"
              placeholder="X-XXX OR XXXXX"
              onChange={e => {
                e.persist();
                setTitleData(prev => ({ ...prev, teamCode: e.target.value }));
              }}
              onBlur={(e) => onTeamCodeValidation(e.target.value)}
            /> */}

            <AssignTeamCodeField
              teamCodeData={existTeamCodes}
              onDropDownSelect={selectTeamCode}
              selectedTeamCode={selectedTeamCode}
              cleanTeamCodeAssign={cleanTeamCodeAssign}
              onSelectTeamCode={onSelectTeamCode}
            />

            <Label className={fontColor}>Project Assignment<span className='qsm-modal-required'>*</span>:</Label>
            <AssignProjectField
              projectsData={projectsData}
              onDropDownSelect={selectProject}
              selectedProject={selectedProject}
              cleanProjectAssign={cleanProjectAssign}
              onSelectProject={onSelectProject}
            />
            <Label className={fontColor}>Team Assignment:</Label>
            <AssignTeamField
              teamsData={teamsData}
              onDropDownSelect={selectTeam}
              selectedTeam={selectedTeam}
              setSearchText={setSearchText}
              searchText={searchText}
              cleanTeamAssigned={cleanTeamAssigned}
              onSelectTeam={onSelectTeam}
              undoTeamAssigned={undoTeamAssigned}
            />
          </FormGroup>
        </Form>
      </ModalBody>

      <ModalFooter className={darkMode ? 'bg-yinmn-blue' : ''}>
        <Button color="primary" onClick={() => confirmOnClick()}>
          Confirm
        </Button>
        <Button color="secondary" onClick={() => setIsOpen(false)}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default AddNewTitleModal;