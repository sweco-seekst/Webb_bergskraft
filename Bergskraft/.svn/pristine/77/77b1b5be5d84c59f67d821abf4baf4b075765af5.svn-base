using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Globalization;

/// <summary>
/// Summary description for StringHelper
/// </summary>
public class StringHelper {
	private StringHelper() {
	}

	#region ToIntArray
	/// <summary>
	/// Takes a string separated with one specified char. And the rest if the values has to be integers.
	/// </summary>
	/// <param name="separatedString">String that can be splitted on a char value.
	/// eg: "1¤-2¤3"
	///	</param>
	/// <param name="splitter">charcter that splits the string. eg: '¤'</param>
	/// <returns></returns>
	public static int[] ToIntArray(string separatedString, char splitter) {
		if(separatedString == null || separatedString.Length == 0) return null;
		// Split to string[]
		char[] arrSplitter = new char[] { splitter };
		string[] tmp = separatedString.Split(arrSplitter);
		// convert to 
		int[] retValues = new int[tmp.Length];
		for(int i = 0; i < retValues.Length; i++) {
			retValues[i] = int.Parse(tmp[i], NumberStyles.Integer);
		}
		return retValues;
	}
	#endregion

}
