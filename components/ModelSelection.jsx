"use client"
import useSWR from "swr"
import Select from 'react-select'

const fetchModels = () => fetch('/api/getModelEngine').then(res => res.json());

function ModelSelection() {

  const { data: models, isLoading } = useSWR('models', fetchModels);
 
  const { data: model, mutate: setModel } = useSWR('model', {
    fallbackData:'gpt-3.5-turbo'
  });

  return (
      <div>
      <Select
        className="mb-2"
        options={models?.modelOptions}
        placeholder={model}
        defaultValue={model}
        isSearchable={true}
        isLoading={isLoading}
        menuPosition="fixed"
        classNames={
          {
            control: (state) => { "bg-[#434654] border-[#434654]" },
          }
        }
        onChange={(e) => setModel(e.value)}
     
        />
    </div>
  )
}

export default ModelSelection