export default function SkillTags({ skills }) {
  return (
    <ul aria-label="Skills" className="tag-list">
      {skills.map((skill) => <li key={skill}>{skill}</li>)}
    </ul>
  )
}
