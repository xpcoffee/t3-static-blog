"use client";
import React, { useState } from "react";

/**
 * A representation for a note that allows us to use math to calculate accidentals.
 */
type Note = (typeof NOTES)[number] & {
  accidental: number;
};

function toNote(noteString: string | undefined): Note {
  const [noteName, ...modifiers] = noteString?.split("") ?? ["unknown"];
  const modifierSymbol = modifiers[0] === "#" ? 1 : -1;
  const modifierValue = modifiers.length * modifierSymbol;
  const note = NOTES.find(({ name }) => name === noteName?.toUpperCase());
  if (note === undefined) {
    throw Error("Unexpected note " + noteName);
  }

  // Use the accidental to modify the interval relative to C
  const modifiedInterval = note.interval + modifierValue;
  const boundedInterval =
    (modifiedInterval > 0 ? modifiedInterval : modifiedInterval + 12) % 12;

  return {
    ...note,
    interval: boundedInterval,
    accidental: modifierValue,
  };
}

function toNoteString({ accidental, name }: Note) {
  if (accidental > 0) {
    return name + "#".repeat(accidental);
  } else {
    return name + "b".repeat(accidental * -1);
  }
}

/**
 * Basic information about musical notes & the distances between them
 */
const NOTES = [
  { name: "C", intervalFromPreviousNote: 1, interval: 0 },
  { name: "D", intervalFromPreviousNote: 2, interval: 2 },
  { name: "E", intervalFromPreviousNote: 2, interval: 4 },
  { name: "F", intervalFromPreviousNote: 1, interval: 5 },
  { name: "G", intervalFromPreviousNote: 2, interval: 7 },
  { name: "A", intervalFromPreviousNote: 2, interval: 9 },
  { name: "B", intervalFromPreviousNote: 2, interval: 11 },
];

/**
 * The names of the intervals; used to name chords
 */
const INTERVALS = [
  "T",
  "ii",
  "II",
  "iii",
  "III",
  "IV",
  "tritone",
  "V",
  "vi",
  "VI",
  "vii",
  "VII",
];

/**
 * Provides the pattern of intervals between notes which results in a modal scale.
 */
const MODAL_SCALE_STRUCTURE = [2, 2, 1, 2, 2, 2, 1];
const MODES: Record<
  string,
  { degree: number; symbol: string; name: string; nickname?: string }
> = {
  "1": { degree: 1, symbol: "I", name: "Ionian", nickname: "major" },
  "2": { degree: 1, symbol: "ii", name: "Dorian" },
  "3": { degree: 1, symbol: "iii", name: "Phrygian" },
  "4": { degree: 1, symbol: "IV", name: "Lydian" },
  "5": { degree: 1, symbol: "V", name: "Myxolidian" },
  "6": { degree: 1, symbol: "vi", name: "Aeolian", nickname: "natural minor" },
  "7": { degree: 1, symbol: "vii", name: "Locrian" },
};

/**
 * "Rotates" the modal scale structure based on the degree of the mode (e.g. Ionian is degree 1)
 * https://en.wikipedia.org/wiki/Mode_(music)#Modern_modes
 */
function getStructureForScaleDegree(scaleDegree: number) {
  if (scaleDegree < 1 || scaleDegree > 7) {
    throw Error("unexpected scale degree " + scaleDegree);
  }
  return [
    ...MODAL_SCALE_STRUCTURE.slice(scaleDegree - 1),
    ...MODAL_SCALE_STRUCTURE.slice(0, scaleDegree - 1),
  ];
}

/**
 * Western scales MUST have all 8 note names in them; this function prepares this base.
 */
function getScaleBaseForKey(keyIndex: number): typeof NOTES {
  return [...NOTES.slice(keyIndex), ...NOTES.slice(0, keyIndex)];
}

/**
 * Returns a modal scale given the modal scale degree and a key.
 */
function getModalScale(scaleDegree: number, key: Note): string[] {
  try {
    const keyIndex = NOTES.findIndex(({ name }) => name === key.name);

    const scaleBase = getScaleBaseForKey(keyIndex);
    const structure = getStructureForScaleDegree(scaleDegree);

    const scale: string[] = [toNoteString(key)];

    let currentModifier = key.accidental;
    for (let i = 0; i < scaleBase.length - 1; i++) {
      const note = scaleBase[i + 1];
      const intervalsForward = structure[i] ?? 0;
      currentModifier =
        currentModifier +
        intervalsForward -
        (note?.intervalFromPreviousNote ?? 0);

      if (note === undefined) {
        throw "note undefined";
      }

      scale.push(
        toNoteString({
          ...note,
          accidental: currentModifier,
        }),
      );
    }

    return scale;
  } catch (e) {
    console.error(e);
    return ["-", "-", "-", "-", "-", "-", "-"];
  }
}

function getChordNames(roots: string[], thirds: string[], fifths: string[]) {
  const fallback = ["-", "-", "-", "-", "-", "-", "-"];
  const chordNames: string[] = [];
  for (let i = 0; i < roots.length; i++) {
    const root = toNote(roots[i]);
    const third = toNote(thirds[i]);
    const fifth = toNote(fifths[i]);
    console.log({ 0: root.interval, 3: third.interval, 5: fifth.interval });

    const thirdInterval =
      third.interval -
      root.interval +
      (third.interval > root.interval ? 0 : 12);
    const thirdIntervalName = INTERVALS[thirdInterval];
    if (!thirdIntervalName) {
      console.log("Unexpected interval " + thirdInterval);
      return fallback;
    }

    const fifthInterval =
      fifth.interval -
      third.interval +
      (fifth.interval > third.interval ? 0 : 12);
    const fifthIntervalName = INTERVALS[fifthInterval];
    if (!fifthIntervalName) {
      console.log("Unexpected interval " + fifthInterval);
      return fallback;
    }

    if (thirdIntervalName === "iii" && fifthIntervalName === "III") {
      chordNames.push(roots[i] + "min");
    } else if (thirdIntervalName === "III" && fifthIntervalName === "iii") {
      chordNames.push(roots[i] + "maj");
    } else if (thirdIntervalName === "iii" && fifthIntervalName === "iii") {
      chordNames.push(roots[i] + "dim");
    } else if (thirdIntervalName === "III" && fifthIntervalName === "III") {
      chordNames.push(roots[i] + "aug");
    } else {
      chordNames.push("??");
      console.log(
        `Unkown triad 3rd: ${thirdIntervalName}, 5th: ${fifthIntervalName}`,
      );
    }
  }
  return chordNames;
}

const ModalScale = () => {
  const [key, setKey] = useState(toNote("C"));
  const [scaleDegree, setScaleDegree] = useState("1");
  const modalScale = getModalScale(Number.parseInt(scaleDegree), key);
  const modalScaleThird = [...modalScale.slice(2), ...modalScale.slice(0, 2)];
  const modalScaleFifth = [...modalScale.slice(4), ...modalScale.slice(0, 4)];
  const chordNames = getChordNames(
    modalScale,
    modalScaleThird,
    modalScaleFifth,
  );

  return (
    <div>
      <div className="table">
        <div className="table-row">
          <label htmlFor="modeSelect" className="table-cell">
            Scale degree
          </label>
          <select
            id="modeSelect"
            onChange={(event) => setScaleDegree(event.currentTarget.value)}
            className="ml-5 table-cell"
          >
            {Object.entries(MODES).map(([key, mode]) => (
              <option
                value={key}
                key={"mode" + mode.symbol}
              >{`${mode.name} (${mode.symbol}) ${mode.nickname ?? ""}`}</option>
            ))}
          </select>
        </div>
        <div className="table-row">
          <label htmlFor="keyInput" className="table-cell">
            Key
          </label>
          <input
            className="ml-5 table-cell"
            id="keyInput"
            placeholder="C / Bb / G#"
            pattern="^[A-Ga-g]{1}(b*|#*)$"
            onInputCapture={(event) =>
              event.currentTarget.checkValidity() &&
              setKey(toNote(event.currentTarget.value || "C"))
            }
          ></input>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="mt-8 table-fixed">
          <caption>
            {MODES[scaleDegree]?.name} in the key of {toNoteString(key)}
          </caption>
          <thead>
            <tr>
              <td></td>
              {["I", "II", "III", "IV", "V", "VI", "VII"].map((val) => (
                <td key={val}>{val}</td>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>root</td>
              {modalScale.map((val) => (
                <td key={"root-" + val}>{val}</td>
              ))}
            </tr>
            <tr>
              <td>triad third</td>
              {modalScaleThird.map((val) => (
                <td key={"triad-" + val}>{val}</td>
              ))}
            </tr>
            <tr>
              <td>triad fifth</td>
              {modalScaleFifth.map((val) => (
                <td key={"fifth-" + val}>{val}</td>
              ))}
            </tr>
            <tr>
              <td>diatonic chord</td>
              {chordNames.map((val) => (
                <td key={"chord-" + val}>{val}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export { ModalScale };
