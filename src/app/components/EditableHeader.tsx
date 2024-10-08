import React, { useState } from 'react';

const EditableHeader = ({
    inputValue
}:{
    inputValue?: number
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(inputValue);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
   
    if (!isNaN(Number(value))) {
        if(Number(value) <= 60){
            inputValue = undefined
        } else {

            setContent(Number(value));
        }
    }
  };

  return (
    <div className='text-xs text-center w-2/12 border-collapse border border-black'>
      {inputValue ? isEditing ? (
        <input
          type='text'
          value={content}
          onChange={handleChange}
          onBlur={handleBlur}
          autoFocus
          placeholder=''
          className='w-full'
        />
      ) : (
        <h1 className='w-full' onDoubleClick={handleDoubleClick}>
          {content}
        </h1>
      ): (
        <input
          type='number'
          value={content}
          onChange={handleChange}
          onBlur={handleBlur}
          autoFocus
          placeholder=''
          className='w-full h-full text-center px-2 appearance-none '
          style={{ 
            MozAppearance: 'textfield', // Hides spinners in Firefox
            WebkitAppearance: 'none',   // Hides spinners in Safari
            msOverflowStyle: 'none'     // Hides spinners in Edge
          }}
        />
      )}
    </div>
  );
};

export default EditableHeader;