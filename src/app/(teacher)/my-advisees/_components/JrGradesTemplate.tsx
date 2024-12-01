import React from 'react'

function JrGradesTemplate() {
  return (
    <div className='text-xs md:text-sm w-full gap-x-10'>
        <h1 className='text-sm font-semibold text-center mb-4'>REPORT ON LEARNING PROGRESS AND ACHIEVEMENT</h1>
    
        <div className="grid grid-cols-12 w-full bg-gray-200 items-center text-center font-semibold text-xs md:text-sm border border-black">
            <h1 className='col-span-4 h-full flex items-center justify-center border-r border-r-black'>Learning Areas</h1>
            <div className="col-span-4 grid grid-cols-4 text-center items-center border-r border-r-black">
                <h1 className='col-span-4 border-b border-b-black'>Quarter</h1>
                <h1 className='col-span-1 '>1st</h1>
                <h1 className='col-span-1 border-l border-l-black'>2nd</h1>
                <h1 className='col-span-1 border-l border-l-black'>3rd</h1>
                <h1 className='col-span-1 border-l border-l-black'>4th</h1>
            </div>
            <h1 className='col-span-2 flex items-center justify-center h-full '>Final Rating</h1>
            <h1 className='col-span-2 flex items-center justify-center h-full border-l border-l-black'>Remarks</h1>
        </div>
        
        {/* Grades Data */}
        <div className="grid grid-cols-12 w-full bg-gray-100 items-center text-center font-medium text-sm">
            <div className='col-span-4 border-b border-black border-x p-2 text-left'>English</div>
            <div className='col-span-1 border-b border-black border-r p-2'>85</div>
            <div className='col-span-1 border-b border-black border-r p-2'>87</div>
            <div className='col-span-1 border-b border-black border-r p-2'>88</div>
            <div className='col-span-1 border-b border-black border-r p-2'>86</div>
            <div className='col-span-2 border-b border-black border-r p-2'>87</div>
            <div className='col-span-2 border-b border-black border-r p-2'>Passed</div>
        </div>
        <div className="grid grid-cols-12 w-full bg-gray-100 items-center text-center font-medium text-sm">
            <div className='col-span-4 border-b border-black border-x p-2 text-left'>Mathematics</div>
            <div className='col-span-1 border-b border-black border-r p-2'>70</div>
            <div className='col-span-1 border-b border-black border-r p-2'>74</div>
            <div className='col-span-1 border-b border-black border-r p-2'>76</div>
            <div className='col-span-1 border-b border-black border-r p-2'>75</div>
            <div className='col-span-2 border-b border-black border-r p-2'>74</div>
            <div className='col-span-2 border-b border-black border-r p-2'>Failed</div>
        </div>
        <div className="grid grid-cols-12 w-full bg-gray-100 items-center text-center font-medium text-sm">
            <div className='col-span-4 border-b border-black border-x p-2 text-left'>Science</div>
            <div className='col-span-1 border-b border-black border-r p-2'>89</div>
            <div className='col-span-1 border-b border-black border-r p-2'>91</div>
            <div className='col-span-1 border-b border-black border-r p-2'>90</div>
            <div className='col-span-1 border-b border-black border-r p-2'>88</div>
            <div className='col-span-2 border-b border-black border-r p-2'>90</div>
            <div className='col-span-2 border-b border-black border-r p-2'>Passed</div>
        </div>
        <div className="grid grid-cols-12 w-full bg-gray-100 items-center text-center font-medium text-sm">
            <div className='col-span-4 border-b border-black border-x p-2 text-left'>Filipino</div>
            <div className='col-span-1 border-b border-black border-r p-2'>90</div>
            <div className='col-span-1 border-b border-black border-r p-2'>89</div>
            <div className='col-span-1 border-b border-black border-r p-2'>92</div>
            <div className='col-span-1 border-b border-black border-r p-2'>91</div>
            <div className='col-span-2 border-b border-black border-r p-2'>91</div>
            <div className='col-span-2 border-b border-black border-r p-2'>Passed</div>
        </div>
        <div className="grid grid-cols-12 w-full bg-gray-100 items-center text-center font-medium text-sm">
            <div className='col-span-4 border-b border-black border-x p-2 text-left'>Araling Panlipunan</div>
            <div className='col-span-1 border-b h-full border-black border-r p-2'>88</div>
            <div className='col-span-1 border-b h-full border-black border-r p-2'>87</div>
            <div className='col-span-1 border-b h-full border-black border-r p-2'>89</div>
            <div className='col-span-1 border-b h-full border-black border-r p-2'>90</div>
            <div className='col-span-2 border-b h-full border-black border-r p-2'>89</div>
            <div className='col-span-2 border-b h-full border-black border-r p-2'>Passed</div>
        </div>
        <div className="grid grid-cols-12 w-full bg-gray-100 items-center text-center font-medium text-sm">
            <div className='col-span-4 border-b border-black border-x p-2 text-left'>Edukasyon sa Pagpapakatao (EsP)</div>
            <div className='col-span-1 border-b h-full border-black border-r p-2'>91</div>
            <div className='col-span-1 border-b h-full border-black border-r p-2'>90</div>
            <div className='col-span-1 border-b h-full border-black border-r p-2'>92</div>
            <div className='col-span-1 border-b h-full border-black border-r p-2'>91</div>
            <div className='col-span-2 border-b h-full border-black border-r p-2'>91</div>
            <div className='col-span-2 border-b h-full border-black border-r p-2'>Passed</div>
        </div>
        <div className="grid grid-cols-12 w-full bg-gray-100 items-center text-center font-medium text-sm">
            <div className='col-span-4 border-b h-full border-black border-x p-2 text-left'>Edukasyong Pantahanan at Pangkabuhayan</div>
            <div className='col-span-1 border-b h-full border-black border-r p-2'>88</div>
            <div className='col-span-1 border-b h-full border-black border-r p-2'>87</div>
            <div className='col-span-1 border-b h-full border-black border-r p-2'>89</div>
            <div className='col-span-1 border-b h-full border-black border-r p-2'>90</div>
            <div className='col-span-2 border-b h-full border-black border-r p-2'>89</div>
            <div className='col-span-2 border-b h-full border-black border-r p-2'>Passed</div>
        </div>
        <div className="grid grid-cols-12 w-full border-x border-b border-black bg-gray-100 items-center text-center font-medium text-sm">
            <div className='col-span-4  text-center border-r border-r-black'>
                <h1 className='text-left border-b border-b-black p-2'>MAPEH</h1>
                <h1 className='border-b border-b-black p-1'>Music</h1>
                <h1 className='border-b border-b-black p-1'>Arts</h1>
                <h1 className='border-b border-b-black p-1'>Physical <br/>Education</h1>
                <h1 >Health</h1>
            </div>
            <div className='col-span-1 border-r border-r-black h-full'>
                <h1 className='border-b border-b-black p-2'>90</h1>
                <h1 className='border-b border-b-black p-1'>90</h1>
                <h1 className='border-b border-b-black p-1'>90</h1>
                <h1 className='border-b border-b-black p-1'>90<br/> <span className='text-white'> 0</span> </h1>
                <h1 >90</h1>
            </div>
            <div className='col-span-1 border-r border-r-black h-full'>
                <h1 className='border-b border-b-black p-2'>90</h1>
                <h1 className='border-b border-b-black p-1'>90</h1>
                <h1 className='border-b border-b-black p-1'>90</h1>
                <h1 className='border-b border-b-black p-1'>90<br/> <span className='text-white'> 0</span> </h1>
                <h1 >90</h1>
            </div>
            <div className='col-span-1 border-r border-r-black h-full'>
            <h1 className='border-b border-b-black p-2'>90</h1>
                <h1 className='border-b border-b-black p-1'>90</h1>
                <h1 className='border-b border-b-black p-1'>90</h1>
                <h1 className='border-b border-b-black p-1'>90 <br/> <span className='text-white'> 0</span></h1>
                <h1 >90</h1>
            </div>
            <div className='col-span-1 border-r border-r-black h-full'>
                <h1 className='border-b border-b-black p-2'>90</h1>
                <h1 className='border-b border-b-black p-1'>90</h1>
                <h1 className='border-b border-b-black p-1'>90</h1>
                <h1 className='border-b border-b-black p-1'>90 <br/> <span className='text-white'> 0</span></h1>
                <h1 >90</h1>
            </div>
            <div className='col-span-2  h-full'>
                <h1  className='border-b border-b-black p-2'>90</h1>
            
            </div>
            <div className='col-span-2 border-l border-l-black  h-full'>
                <h1  className='border-b border-b-black p-2'>Passed</h1>
            </div>
        </div>
        <div className="grid grid-cols-12 w-full bg-gray-100 items-center text-center font-medium text-sm">
            <div className='col-span-4 border-r '></div>
            <div className='col-span-4 border-b border-black border-x font-semibold tracking-widest font-serif text-lg'>General Average</div>
            
            <div className='col-span-2 border-b border-black border-r font-semibold text-lg'>89</div>
            
        </div>    
    </div>
  )
}

export default JrGradesTemplate