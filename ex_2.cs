using System;

namespace MyApp
{
    internal class Program
    {
        //This function help to implement the requests of the chosen triangle
        public static void helpTriangle(int tHeight, int tWidth)
        {
            Console.WriteLine("Enter 1 for perimeter of the triangle and 2 for printing the triangle");
            int choice = int.Parse(Console.ReadLine());
            while(choice!=1 && choice!=2)    //Checks the input
            {
                Console.WriteLine("Invalid input");
                Console.WriteLine("Enter 1 for perimeter of the triangle and 2 for printing the triangle");
                choice = int.Parse(Console.ReadLine());
            }
            switch (choice)
            {
                case 1: //Calculate the perimeter of the triangle
                    double c = Math.Sqrt(Math.Pow(tHeight, 2)+Math.Pow(((double)tWidth /2.0),2));
                    double perimeter = c * 2 + tWidth;
                    Console.WriteLine("The perimeter of the triangle is " + perimeter);
                    break;
                case 2: //Print the triangle
                    if(tWidth%2==0 || tWidth>2*tHeight)//Checks if the triangle can be printed
                        Console.WriteLine("The triangle can't be printed");
                    if(tWidth % 2 == 1 && tWidth < 2 * tHeight)
                    {
                        //Calculation for the middle rows
                        int numOdd = (tWidth - 2) / 2;
                        int remainder = tHeight - 2;
                        int divider = remainder / numOdd;
                        int firstNum = remainder % numOdd + divider;
                        int numStar = 3;
                        bool isStart = true;

                        for (int i = 1; i <= tHeight;)
                        {
                            if(i==1)
                            {
                                for (int j = 0; j < tWidth/2; j++)  //First row in the triangle
                                {
                                    Console.Write(" ");
                                }
                                Console.WriteLine("*");
                                i++;
                            }
                            else if(i==tHeight)  //Last row in the triangle
                            {
                                for (int j = 0; j < tWidth; j++)
                                {
                                    Console.Write("*");
                                }
                                Console.WriteLine();
                                i++;
                            }
                            else  //The middle rows
                            {
                               if(isStart)
                                {  //Rows including the remainder
                                    pritMidRowStar(firstNum, ref numStar,tWidth);
                                    i += firstNum;
                                    isStart=false;
                               } 
                                else
                                {
                                    pritMidRowStar(divider, ref numStar, tWidth);
                                    i+=divider;
                                }
                            }
                            
                        }
                    }
                    break;
            }
        }

        //This function gets the rows and number of stars and prints the middle stars.
        public static void pritMidRowStar(int rows, ref int numstars, int width)
        {
            for (int j = 0; j < rows; j++)
            {
                int space = (width - numstars)/2;
                for (int i = 0; i < space; i++)
                    Console.Write(" ");
                for (int k = 0; k < numstars; k++)
                    Console.Write("*");
                Console.WriteLine();
            }
            numstars += 2;
        }

        public static void Main(string[] args)
        {
            Console.WriteLine("Enter 1 for rectangle, 2 for triangle and 3 for exit");
            int num= int.Parse(Console.ReadLine());
            int height, width;
            while (num!=3)
            {
                if (num != 1 && num != 2) // Checks the input
                {
                    Console.WriteLine("Invalid input");
                    Console.WriteLine("Enter 1 for rectangle, 2 for triangle and 3 for exit");
                    num = int.Parse(Console.ReadLine());
                }
                else
                {
                    Console.WriteLine("Enter height and width");
                    height = int.Parse(Console.ReadLine());//valid input
                    width = int.Parse(Console.ReadLine());
                    while(width<1) // Checks the input
                    {
                        Console.WriteLine("Enter valid width");
                        width = int.Parse(Console.ReadLine());
                    }
                    switch (num)
                    {
                        case 1: //Calculation for rectangle
                            if (height - width > 5 || width - height > 5 || width==height)
                                Console.WriteLine("The area of the rectangle is " + height * width);
                            else
                                Console.WriteLine("The perimeter of the rectangle is " + (height * 2 + width * 2));
                            break;
                        case 2:
                            helpTriangle(height, width);
                            break;
                    }
                    Console.WriteLine("Enter 1 for rectangle, 2 for triangle and 3 for exit");
                    num = int.Parse(Console.ReadLine());
                }
               
            }
        }
    }
}
//Running Example
/*
Enter 1 for rectangle, 2 for triangle and 3 for exit
2
Enter height and width
12
9
Enter 1 for perimeter of the triangle and 2 for printing the triangle
1
The perimeter of the triangle is 34.63201123595259
Enter 1 for rectangle, 2 for triangle and 3 for exit
1
Enter height and width
12
9
The perimeter of the rectangle is 42
Enter 1 for rectangle, 2 for triangle and 3 for exit
2
Enter height and width
12
9
Enter 1 for perimeter of the triangle and 2 for printing the triangle
2
    *
   ***
   ***
   ***
   ***
  *****
  *****
  *****
 *******
 *******
 *******
*********
Enter 1 for rectangle, 2 for triangle and 3 for exit
1
Enter height and width
13
2
The area of the rectangle is 26
Enter 1 for rectangle, 2 for triangle and 3 for exit
3
*/
