import { label, value, box } from "./entryStyles.js";

export default function EntryMeta({ contributor, place, ingredients }) {
  return (
    <>
      <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
        <div>
          <p style={label}>Contributor</p>
          <p style={value}>{contributor}</p>
        </div>
        <div>
          <p style={label}>Place</p>
          <p style={value}>{place}</p>
        </div>
      </div>

      {ingredients && (
        <div>
          <p style={label}>Ingredients</p>
          <p style={box}>{ingredients}</p>
        </div>
      )}
    </>
  );
}
