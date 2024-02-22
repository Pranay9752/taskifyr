import { useState } from "react"






const SubChild = ({ data, index = 0, addNode }) => {
    const [showChildren, setShowChildren] = useState(false)
    const [inputData, setInputData] = useState("")

    const [isAdd, setIsAdd] = useState(false)
    const showChild = () => {
        setShowChildren(!showChildren)
    }


    const handleInputChange = (e) => {
        setInputData(e.target.value)
    }

    const handleIsAdd = () => {
        setIsAdd(true)
    }

    const addNewNode = (e) => {
        if (e.key === "Enter") {

            addNode(data.id, true, e.target.value, 10)
            setIsAdd(false)
        }
    }


    return (<div className={`w-full pl-3`}>
        <div className="flex justify-between items-center  hover:bg-black/20 rounded-md cursor-pointer">
            <div onClick={showChild} className={`flex   px-0.5 py-3 justify-start items-center gap-1 rounded-md cursor-pointer`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                </svg>

                <p className="capitalize text-sm font-medium">{data.name}</p>
            </div>
            <svg onClick={handleIsAdd} className="hover:font-semibold" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
        </div>
        {
            isAdd ? <>
                <input
                    value={inputData}
                    // onChange={handleInputChange}
                    onKeyDown={addNewNode}
                    className="border-1 outline-none bg-gray-100 rounded-sm p-0.5"
                />
            </> : <></>
        }

        {
            showChildren ?
                <ul className="">
                    {data.childs.map((child, index) => {

                        return <>
                            <li key={index} className=" ">
                                {
                                    !child.isFolder ?
                                        <div className={`flex justify-start items-center gap-1 pl-3`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="m9 13.5 3 3m0 0 3-3m-3 3v-6m1.06-4.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                                            </svg>
                                            <p className="capitalize text-sm font-medium  px-0.5 py-3 ">{child.name}</p>
                                        </div>

                                        : <>
                                            <SubChild data={child} index={index} addNode={addNode} />
                                        </>
                                }
                            </li>
                        </>
                    })}
                </ul>
                : <></>
        }

    </div>)
}

export function Test() {


    const [data, setData] = useState({
        id: 0,
        name: "root",
        childs: [
            {
                name: "p1",
                id: 1,
                childs: [{
                    name: "p3",
                    id: 2,
                    childs: [{
                        name: "file4",
                        id: 3,
                        childs: [],
                        isFolder: false
                    }],
                    isFolder: true
                },

                ],
                isFolder: true
            },
            {
                name: "p1",
                id: 4,
                childs: [],
                isFolder: false
            },
        ],
        isFolder: true
    })

    const appendChild = (id, isFolder, name, newId) => {
        console.log(name)
        if (data.id === id) {
            setData((prev) => {
                const newObject = { ...prev }

                const isNamePresent = newObject['childs'].find(item => item.name?.toLowerCase() === name?.toLowerCase())
                if (isNamePresent) return prev
                newObject['childs'].unshift({
                    id: newId,
                    name: name,
                    isfolder: isFolder,
                    childs: []
                })
                return newObject
            })

        }


    }

    return <>
        <div className="w-[25%] h-full">

            <SubChild data={data} addNode={appendChild} />
        </div>
    </>

}

