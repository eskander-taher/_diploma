import { useState, ChangeEvent, FormEvent } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import RichEditor from '../../components/RichEditor';
import useCreateEvent from '../../api/events/useCreateEvent';
import useAuth from '../../hooks/useAuth';

interface Section {
  sectionOrder: string;
  sectionName: string;
}

const AddEvent = () => {
  const { user } = useAuth();
  const [eventName, setEventName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [sections, setSections] = useState<Section[]>([
    { sectionOrder: '', sectionName: '' },
  ]);
  const { mutate, isLoading, error } = useCreateEvent();


  console.log(error);
  const handleSectionChange = (index: number, field: string, value: string) => {
    const newSections = sections.map((section, i) =>
      i === index ? { ...section, [field]: value } : section,
    );
    setSections(newSections);
  };

  const addSection = () => {
    setSections([...sections, { sectionOrder: '', sectionName: '' }]);
  };

  const removeSection = (index: number) => {
    setSections(sections.filter((_, i) => i !== index));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const payload = {
      name: eventName,
      description,
      adminId: user.userId,
      sections: sections.map((section) => ({
        sectionOrder: parseFloat(section.sectionOrder), // Ensure sectionOrder is stored as a float
        sectionName: section.sectionName,
      })),
    };

    // console.log(payload)

    mutate(payload, {
      onSuccess: () => {
        //  console.log('Event created successfully:', data);
        // Reset the form
        setEventName('');
        setDescription('');
        setSections([{ sectionOrder: '', sectionName: '' }]);
      },
    });

    // try {
    //   const response = await fetch('http://localhost:5000/api/events/', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(payload),
    //   });

    //   if (response.ok) {
    //     const data = await response.json();
    //     console.log('Event created successfully:', data);
    //     // Reset the form
    //     setEventName('');
    //     setDescription('');
    //     setSections([{ sectionOrder: '', sectionName: '' }]);
    //   } else {
    //     console.error('Error creating event:', response.statusText);
    //   }
    // } catch (error) {
    //   console.error('Error creating event:', error);
    // }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Add Event" />
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">Event Form</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6.5">
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full">
                <label className="mb-2.5 block text-black dark:text-white">
                  Event name
                </label>
                <input
                  type="text"
                  placeholder="Enter event name"
                  value={eventName}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setEventName(e.target.value)
                  }
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
            </div>

            {sections.map((section, index) => (
              <div
                key={index}
                className="mb-4.5 flex flex-col gap-6 xl:flex-row"
              >
                <div className="w-full xl:w-1/6">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Section Number
                  </label>
                  <input
                    type="text"
                    placeholder="Enter section number"
                    value={section.sectionOrder}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleSectionChange(index, 'sectionOrder', e.target.value)
                    }
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="w-full">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Section name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter section name"
                    value={section.sectionName}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleSectionChange(index, 'sectionName', e.target.value)
                    }
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeSection(index)}
                  className="mt-7 flex h-10 w-full items-center justify-center rounded bg-red-500 text-white hover:bg-red-600 xl:w-auto"
                >
                  Remove
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={addSection}
              className="mb-4 flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
            >
              Add Section
            </button>

            <div className="mb-6">
              <label className="mb-2.5 block text-black dark:text-white">
                Description
              </label>
              <RichEditor
                description={description}
                setDescription={setDescription}
              />
            </div>

            <button
              type="submit"
              className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
            >
              Save and Submit
            </button>
          </div>
        </form>
      </div>
    </DefaultLayout>
  );
};

export default AddEvent;
