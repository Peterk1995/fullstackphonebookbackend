const skills = [
    { id: 4, name: 'Skill 4' },
    { id: 5, name: 'Skill 5' },
    { id: 12, name: 'Skill 12' },
    { id: 99, name: 'Skill 99' }
  ];

const generateId = () => {
    const maxId = skills.length > 0
    ? Math.max(...skills.map(n => n.id))
    : 0
    return maxId + 1
  }

  console.log(generateId())