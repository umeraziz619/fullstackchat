import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React from 'react'

const ConfirmDeleteDialog = ({open,handlerClose,deleteHandler}) => {
  return <Dialog open={open} onClose={handlerClose}>
    <DialogTitle>Confirm Deelte</DialogTitle>
    <DialogContent>
        <DialogContentText>Are you sure you want to delete this group?</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handlerClose}>No</Button>
      <Button onClick={deleteHandler} color='error'>Yes</Button>
    </DialogActions>
  </Dialog>
}

export default ConfirmDeleteDialog