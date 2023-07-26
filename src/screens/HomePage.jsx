import React, {useState, useEffect} from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import CreateIcon from '@mui/icons-material/Create';
import ListItemText from '@mui/material/ListItemText';
import TextEditor from '../components/home/TextEditor';
import { Button, createTheme, ThemeProvider } from '@mui/material';
import { logout, getNotes, saveNote } from '../firebase';
import "./HomePage.css";
const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function HomePage({authUser}) {

  const theme = useTheme();
  const theme2 = createTheme({
    palette: {
      secondary: {
        main: '#F7F314' // Set the desired color code for yellow
      }
    }
  });
  const [open, setOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [userDisplayName] = authUser? [`${authUser?.displayName}`]: [''];
  const [newNote, setNewNote] = useState({});
  const [newOrExisting, setNewOrExisting] = useState(null);
  const uid = authUser?.uid;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleNote = (id) => {
    const selectedNote = notes.find((note) => note.id === id);
    setSelectedNote(selectedNote);
    setNewOrExisting(selectedNote);
  };

  const handleNewNote = () => {
    console.log("This is the SelNote: ", selectedNote);
    console.log("This is the NewNote: ", newNote);
    setSelectedNote(newNote);
  };

  const handleCreateNewNote = () => {
    const newNoteContent = '*';
    const newNote = saveNote(newNoteContent, uid).then(() => {
      getNotes(uid).then((res) => {
        var filterArr = res.filter(function(obj){
          return !notes.some(function(note){
            return note.id === obj.id;
          });
        });
        console.log("NEW:", filterArr[0].id);
        // setSelectedNote(filterArr[0]);
        setNewNote(filterArr[0]);
        handleNote(filterArr[0].id);

        setNewOrExisting(filterArr[0]);
        handleNewNote();
      });
      console.log("This is the SelectedNote: ", selectedNote);
      console.log("This is the new Note: ", newNote);
      // setSelectedNote(newNote);
      console.log("This is the SelectedNote: ", selectedNote);
    });
    setNewOrExisting(newNote);
  };

  useEffect(() => {
    if(uid){
      getNotes(uid).then((res) => {
        setNotes(res);
      })
    }
    if(notes){
      const titleArr = makeTitle(notes);
      setTitle(titleArr);
    }

  },[notes, uid]);

  function makeTitle(notesArray){
    let titleArr=[];
    for(let i=0; i<notesArray.length; i++){
      const object = notesArray[i];
      if(typeof object.content === 'string'){
        const shortenContent = object.content.substring(0, 25);
        titleArr.push({id: object.id, content: shortenContent});
      }
    }
    return titleArr;
  }

  return (
    <div>
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
  <Toolbar sx={{ justifyContent: 'space-between' }}>

      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        edge="start"
        sx={{ mr: 2, ...(open && { display: 'none' }) }}
      >
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" >
        {userDisplayName}'s Notes
      </Typography>
    <ThemeProvider theme={theme2}>
      <Button variant="contained" color="secondary" onClick={logout}>Logout</Button>
    </ThemeProvider>
  </Toolbar>
</AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Button variant="outlined" startIcon={<CreateIcon />} onClick={handleCreateNewNote}>Create New Note</Button>
        <Divider />
        <List>
      {title.map((title) => (
        <ListItem key={title.id} disablePadding>
          <ListItemButton onClick={() => handleNote(title.id)}>
            <ListItemText primary={title.content} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
        <Divider />
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {selectedNote && (
          <TextEditor uid={uid} note={newOrExisting}/>
        )}
        
      </Main>
    </Box>
          <div className="app-container">
          <button class="btn" onClick={handleCreateNewNote}> New Note</button>
          </div>
          </div>
  );
}