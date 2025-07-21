const Badge = ({ text, color }) => {
  return (
    <span className={`px-2 py-1 text-xs font-semibold text-white rounded-full ${color}`}>
      {text}
    </span>
  );
};

export default Badge;