type SubjectsBySemester = {
    firstSemester: string[];
    secondSemester: string[];
  };
  
export type StrandSubjects = {
    strand: string;
    coreSubjects: SubjectsBySemester;
    appliedSubjects: SubjectsBySemester;
  };
  export const shsSubjectsByStrand = [
    {
      strand: "STEM", // Science, Technology, Engineering, and Mathematics
      coreSubjects: {
        grade11: {
          firstSemester: [
            "Oral Communication",
            "Komunikasyon at Pananaliksik sa Wika at Kulturang Pilipino",
            "General Mathematics",
            "Earth and Life Science",
            "Understanding Culture, Society and Politics",
            "Physical Education and Health"
          ],
          secondSemester: [
            "Reading and Writing",
            "Pagbasa at Pagsusuri ng Iba’t Ibang Teksto Tungo sa Pananaliksik",
            "Statistics and Probability",
            "Personal Development",
            "21st Century Literature from the Philippines and the World",
            "Contemporary Philippine Arts from the Regions",
            "Media and Information Literacy"
          ]
        },
        grade12: {
          firstSemester: [
            "Philosophy of the Human Person",
            "Entrepreneurship",
            "Physical Education and Health (continued)"
          ],
          secondSemester: [
            "Understanding Culture, Society and Politics (continued)",
            "Research Project"
          ]
        }
      },
      appliedSubjects: {
        grade11: {
          firstSemester: ["Pre-Calculus", "Physics 1", "Biology 1"],
          secondSemester: ["Basic Calculus", "Physics 2", "Biology 2", "Chemistry"]
        },
        grade12: {
          firstSemester: ["Research Project"],
          secondSemester: []
        }
      }
    },
    {
      strand: "ABM", // Accountancy, Business, and Management
      coreSubjects: {
        grade11: {
          firstSemester: [
            "Oral Communication",
            "Komunikasyon at Pananaliksik sa Wika at Kulturang Pilipino",
            "General Mathematics",
            "Earth and Life Science",
            "Understanding Culture, Society and Politics",
            "Physical Education and Health"
          ],
          secondSemester: [
            "Reading and Writing",
            "Pagbasa at Pagsusuri ng Iba’t Ibang Teksto Tungo sa Pananaliksik",
            "Statistics and Probability",
            "Personal Development",
            "21st Century Literature from the Philippines and the World",
            "Contemporary Philippine Arts from the Regions",
            "Media and Information Literacy"
          ]
        },
        grade12: {
          firstSemester: [
            "Physical Education and Health (continued)",
            "Understanding Culture, Society and Politics (continued)"
          ],
          secondSemester: []
        }
      },
      appliedSubjects: {
        grade11: {
          firstSemester: [
            "Applied Economics",
            "Fundamentals of Accountancy, Business, and Management 1",
            "Business Ethics and Social Responsibility"
          ],
          secondSemester: [
            "Fundamentals of Accountancy, Business, and Management 2",
            "Business Math",
            "Business Finance",
            "Organization and Management",
            "Principles of Marketing"
          ]
        },
        grade12: {
          firstSemester: [],
          secondSemester: []
        }
      }
    },
    {
      strand: "HUMSS", // Humanities and Social Sciences
      coreSubjects: {
        grade11: {
          firstSemester: [
            "Oral Communication",
            "Komunikasyon at Pananaliksik sa Wika at Kulturang Pilipino",
            "General Mathematics",
            "Earth and Life Science",
            "Understanding Culture, Society and Politics",
            "Physical Education and Health"
          ],
          secondSemester: [
            "Reading and Writing",
            "Pagbasa at Pagsusuri ng Iba’t Ibang Teksto Tungo sa Pananaliksik",
            "Personal Development",
            "21st Century Literature from the Philippines and the World",
            "Contemporary Philippine Arts from the Regions",
            "Media and Information Literacy"
          ]
        },
        grade12: {
          firstSemester: [
            "Physical Education and Health (continued)",
            "Understanding Culture, Society and Politics (continued)"
          ],
          secondSemester: []
        }
      },
      appliedSubjects: {
        grade11: {
          firstSemester: [
            "Creative Writing",
            "Introduction to World Religions and Belief Systems",
            "Philippine Politics and Governance"
          ],
          secondSemester: [
            "Disciplines and Ideas in the Social Sciences",
            "Disciplines and Ideas in the Applied Social Sciences",
            "Community Engagement, Solidarity, and Citizenship",
            "Trends, Networks, and Critical Thinking in the 21st Century",
            "Creative Nonfiction"
          ]
        },
        grade12: {
          firstSemester: [],
          secondSemester: []
        }
      }
    },
    // Other strands (GAS, TVL-ICT, TVL-HE, TVL-AgriFishery, TVL-IA) would follow the same format...
  ];
  
  