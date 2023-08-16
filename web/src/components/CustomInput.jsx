/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types

const CustomInput = ({ name, id, value, data, setData }) => {
  return (
    <div className="mb-1">
      <input
        name={name}
        type="checkbox"
        className="mr-2"
        id={id}
        checked={data.includes(value) ? true : false}
        onChange={() => {
          if (data.includes(value)) {
            setData(data.filter((item) => item !== value));
          } else {
            setData([...data, value]);
          }
        }}
      />
      <label className="cursor-pointer" htmlFor={id}>
        {value}
      </label>
    </div>
  );
};

export default CustomInput;
