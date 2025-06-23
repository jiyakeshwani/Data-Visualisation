export interface User {
  uid: string;
  email: string | null;
}

export interface Module  {
    name: string;
    bestScenario: string[];
    variables: Variable[];
  };
  
  export interface MonthlyCost {
    name: string;   
    value: number;  
  }
export interface Variable  {
    name: string;
    description: string;
    cost:  MonthlyCost[];
      totalCost: number
    selected: boolean;
    category: string;

  };

  export interface VariableCategory {
    categoryName: string;
    variables: Variable[];
  }

export interface DataPoint  {
    name: string;
    value: number;
  };

