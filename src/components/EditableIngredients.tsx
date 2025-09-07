import { useState, useEffect } from 'react';
import InputList, { EventType } from './InputList';
import inputStyles from './Input.module.css'
import deleteIcon from '../logos/bin.png';
import { IngredientGroup } from '../types/recipe';


const EditableIngredients = ({ onChanged, defaultState } : 
    { 
        onChanged: (e: IngredientGroup[]) => void; 
        defaultState: IngredientGroup[]; 
    }) => {
    const [list, setList] = useState(defaultState);

    const addInstruction = () => {
        let listPrev = [...list];
        listPrev.push({ title: "Ingredients", list: []});
        onChanged([...listPrev ]);
        setList([...listPrev ]);
    }
    
    const removeInstruction = (index: number) => {
        let listPrev = [...list];
        listPrev.splice(index, 1)
        onChanged([...listPrev ]);
        setList([...listPrev ]);
    }
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let listPrev = [...list];
        listPrev[parseInt(e.target.name)].title = e.target.value;
        onChanged([...listPrev ]);
        setList([...listPrev ]);
    }

    const handleListChange = (e: EventType) => {
        let listPrev = [...list];
        listPrev[parseInt(e.target.name)].list = e.target.value;
        onChanged([...listPrev ]);
        setList([...listPrev ]);
    }
     useEffect(() => {
            if(defaultState) {
                setList([ ...defaultState ])
            }
        }, [defaultState]);

    return(
        <div>
            {list?.map((value, index) => (
                <div key={index}>
                    <div className={inputStyles.header}>
                        <img src={deleteIcon.src} alt="remove" className={inputStyles.icon} 
                            onClick={() => removeInstruction(index)}/>
                        <input className={inputStyles.text}
                            type="text"
                            name={index.toString()}
                            defaultValue={value.title}
                            onChange={handleTitleChange}
                        />
                    </div>
                    <InputList name={index.toString()} 
                            defaultState={value.list || []}
                            onChanged={handleListChange} />
                </div>
                ))}
                <button className={inputStyles.button} onClick={addInstruction}>Add</button>
        </div>)
}

export default EditableIngredients;