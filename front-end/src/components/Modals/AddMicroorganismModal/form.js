import React                 from 'react';
import AddMicroorganismModal from '.';

function form() {
  return (
    <AddMicroorganismModal
      title="Add Microorganism Record"
      confirm={() => alert('microorganism add confirmed')}
      ref={microroganismAddRef}
    >
      Add Microorganism
    </AddMicroorganismModal>
  );
}

export default form;
